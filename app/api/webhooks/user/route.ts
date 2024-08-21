import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import UserData from '@/lib/models/user.model'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '@/convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: Request) {


    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }
    const eventType = evt.type;
    switch (eventType) {
        case 'user.created': {
            const user = evt.data
            const newUser = new UserData({
                clerkId: user.id,
                name: user.username,
                email: user.email_addresses[0].email_address,
            })
            await newUser.save()
            await convex.mutation(api.user.crud.createUser, {
                clerkId: user.id,
                mongoId: newUser._id.toString(),
                name: user.username!
            })
            break
        }
        case 'user.updated': {
            const userUpdated = evt.data;
            const updatedUser = await UserData.findOne({ clerkId: userUpdated.id });
            if (updatedUser) {
                updatedUser.name = userUpdated.username;
                updatedUser.email = userUpdated.email_addresses[0].email_address;
                await updatedUser.save();
            } else {
                console.error('User not found for update:', userUpdated.id);
            }
            await convex.mutation(api.user.crud.updateUser, {
                clerkId: userUpdated.id!,
                name: userUpdated.username!
            })
            break;
        }
        case 'user.deleted': {
            const userDeleted = evt.data;
            const deletedUser = await UserData.findOneAndDelete({ clerkId: userDeleted.id });
            if (!deletedUser) {
                console.error('User not found for deletion:', userDeleted.id);
            }
            await convex.mutation(api.user.crud.deleteUser, {clerkId: userDeleted.id!})
            break
        }
        default:
            console.log('Unhandled event type:', eventType);
    }
    return new Response('', { status: 200 })
}