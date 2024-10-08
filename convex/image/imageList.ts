import { query } from "../_generated/server";
import { v } from "convex/values";

export const getCoverImageUrl = query({
    args: { kindeId: v.string() },
    handler: async (ctx, args) => {

        const user = await ctx.db
            .query("user")
            .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
            .collect();
        console.log("user", user);

        const storageId = user[0].coverPhotoId!
        const url = await ctx.storage.getUrl(storageId);
        return url
    },
});

export const getTimerImageUrl = query({
    args: {
        kindeId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const user = await ctx.db
                .query("user")
                .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
                .collect();
            if(!user) throw new Error("Kullanıcı bulunamadı")
            const storageId = user[0].timerPhotoId!
            const url = await ctx.storage.getUrl(storageId);
            return url
        } catch (error:any) {
            throw new Error(error);
        }

    },
});

// export const getImageUrl = query({
//     args: {
//         storageId: v.string()
//     },
//     handler: async (ctx, { storageId }) => {
//         return await ctx.storage.getUrl(storageId);
//     },
// });