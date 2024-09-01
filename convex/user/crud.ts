import { v } from "convex/values";
import { action, mutation, query } from "../_generated/server";
import { internal } from "../_generated/api";
import { update } from "lodash";

export const getUser = query({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, { clerkId }) => {
        try {
            const user = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .first();
            if (!user) {
                throw new Error("Kullanıcı bulunamadı.")
            }
            return user
        } catch (error) {
            throw new Error("Kullanıcı bulunamadı")
        }
    }
});


export const createUser = mutation({
    args: {
        clerkId: v.string(),
        mongoId: v.string(),
        email: v.string()
    },
    handler: async (ctx, { clerkId, mongoId, email }) => {
        try {
            const newUser = await ctx.db.insert("user", { clerkId, mongoId, email })
            if (!newUser) {
                throw new Error("User could not be created")
            }
            return newUser
        } catch (error) {
            throw new Error("Kullanıcı oluşturulurken bir hata oluştu.")
        }
    }
})


export const deleteUser = mutation({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, { clerkId }) => {
        try {
            const userToDelete = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .first();

            // Eğer kullanıcı bulunamazsa, hata fırlat
            if (!userToDelete) {
                throw new Error(`Silinmek istenilen kullanıcı bulunamadı`);
            }

            // Kullanıcıyı sil
            await ctx.db.delete(userToDelete._id);


        } catch (error) {
            throw new Error("Kullanıcı silinemedi");
        }

    }
})

export const updateUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.string()
    },
    handler: async (ctx, { clerkId, email }) => {
        try {
            const user = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("clerkId"), clerkId))
                .first();

            if (!user) {
                throw new Error(`User with clerkId ${clerkId} not found`);
            }

            user.email = email
            await ctx.db.replace(user._id, user);
            return user
        } catch (error) {
            throw new Error("Kullanıcı güncellenemedi")
        }

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
    handler: async (ctx, { clerkId, defaultTemplate }) => {
        try {
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
        } catch (error) {
            throw new Error("Kullanıcı resimleri güncellenemedi")
        }

    },


}) 
