import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import UserData from '@/lib/models/user.model';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import connectDB from '@/lib/config/connectDB';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request): Promise<Response> {
    const WEBHOOK_SECRET_UPDATE = process.env.WEBHOOK_SECRET_UPDATE;

    if (!WEBHOOK_SECRET_UPDATE) {
        console.error('WEBHOOK_SECRET_UPDATE is not defined');
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
    const wh = new Webhook(WEBHOOK_SECRET_UPDATE);

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

        const userUpdated = evt.data as UserJSON
        await connectDB()
        const updatedUser = await UserData.findOne({ kindeId: userUpdated.id });
        const emailsArray = userUpdated.email_addresses.map((email) => email.toString());
        // Update the user in the database
        if (updatedUser) {
            updatedUser.name = userUpdated.username;
            updatedUser.email = emailsArray;
            await updatedUser.save();
        } else {
            console.error('User not found for update:', userUpdated.id);
        }
        await convex.mutation(api.user.crud.updateUser, {
            kindeId: userUpdated.id!,
            email: emailsArray,
        });

        return new Response('Webhook processed successfully', { status: 200 });
    } catch (error) {
        console.error('Error occurred while processing event', error);
        return new Response('Error processing event', {
            status: 500,
        });
    }
}
