import { v } from "convex/values";
import { action, mutation, query } from "../_generated/server";
import { internal } from "../_generated/api";
import { update } from "lodash";

export const getUser = query({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, { clerkId }) => {
        return await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();
    },
});


export const createUser = mutation({
    args: {
        clerkId: v.string(),
        mongoId: v.string(),
        name: v.string()
    },
    handler: async (ctx, { clerkId, mongoId, name }) => {
        const newUser = await ctx.db.insert("user", { clerkId, mongoId, name })
        if (!newUser) {
            throw new Error("User could not be created")
        }

        return newUser
    }
}) 


export const deleteUser = mutation({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, { clerkId }) => {
        const userToDelete = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();

        // Eğer kullanıcı bulunamazsa, hata fırlat
        if (!userToDelete) {
            throw new Error(`User with clerkId ${clerkId} not found`);
        }

        // Kullanıcıyı sil
        await ctx.db.delete(userToDelete._id);

    }
})

export const updateUser = mutation({
    args : {
        clerkId : v.string(),
        name : v.string()
    },
    handler : async (ctx, {clerkId, name}) => {
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();

        if (!user) {
            throw new Error(`User with clerkId ${clerkId} not found`);
        }

        user.name = name
        await ctx.db.replace(user._id, user);
        return user
    }
})

export const updateUserImages = mutation({
    args: {
        clerkId: v.string(),
        defaultTemplate: v.optional(v.object({
            coverPhotoId: v.id("_storage"),
            timerPhotoId: v.id("_storage"),
        })),
    },
    handler: async (ctx, {clerkId , defaultTemplate}) => {
        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("clerkId"), clerkId))
            .first();

        if (!user) {
            throw new Error(`User with clerkId ${clerkId} not found`);
        }
        user.coverPhotoId = defaultTemplate!.coverPhotoId!
        user.timerPhotoId = defaultTemplate!.timerPhotoId!
        console.log("Convex server user", user)
        await ctx.db.replace(user._id, user);
        return user
    },


}) 
