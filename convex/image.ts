import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    const url = await ctx.storage.generateUploadUrl();
    console.log("Generated upload URL:", url);
    return url
});

export const sendImage = mutation({
    args: {
        storageId: v.id("_storage"),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            console.log("args", args);
            const userArray = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
                .collect();
            const user = userArray[0];

            console.log("user", user);
            if (!user) {
                throw new Error("User not found");
            }
            if (!(user.coverPhotoId == "kg27azpz0nzwts5bfdtm3gpek56zcvzx")) {
                await deleteById(ctx, { storageId: user.coverPhotoId! });
            }
            await ctx.db.patch(user._id, {coverPhotoId: args.storageId});
        } catch (error: any) {
            console.log("error", error);
            throw new Error(error);
        }

    },
});
export const deleteById = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.delete(args.storageId);
    },
});

export const getUser = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq("clerkId", args.clerkId))
            .unique();

        return user;
    },
});
