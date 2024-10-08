import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import UserData from '@/lib/models/user.model';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import connectDB from '@/lib/config/connectDB';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request): Promise<Response> {
    const WEBHOOK_SECRET_DELETE = process.env.WEBHOOK_SECRET_DELETE;

    if (!WEBHOOK_SECRET_DELETE) {
        console.error('WEBHOOK_SECRET_DELETE is not defined');
        return new Response('Server configuration error', { status: 500 });
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET_DELETE);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Webhook verification failed', {
            status: 400,
        });
    }

    try {
        const userDeleted = evt.data;
        await connectDB();
        const deletedUser = await UserData.findOneAndDelete({
            kindeId: userDeleted.id,
        });

        if (!deletedUser) {
            console.error('User not found for deletion:', userDeleted.id);
        }

        await convex.mutation(api.user.crud.deleteUser, {
            kindeId: userDeleted.id!,
        });


        return new Response('Webhook processed successfully', { status: 200 });
    } catch (error) {
        console.error('Error occurred while processing event', error);
        return new Response('Error processing event', {
            status: 500,
        });
    }
}
