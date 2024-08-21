import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createUser = mutation({
    args: { 
        clerkId: v.string(),
        mongoId: v.string(),
        name : v.string()
    },
    handler: async (ctx, { clerkId, mongoId, name }) => {
        const newUser = await ctx.db.insert("user", {clerkId, mongoId, name})
        return newUser
    }
}
)


export const deleteUser = mutation({
    args:{
        clerkId: v.string()
    },
    handler: async (ctx, {clerkId}) => {
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
    args:{
        clerkId: v.string(),
        name: v.string()
    },
    handler:  async (ctx, {clerkId , name } ) => {
        const userToDelete = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("clerkId"), clerkId))
        .first();
        
        if (!userToDelete) {
            throw new Error(`User with clerkId ${clerkId} not found`);
          }

        userToDelete.name = name;

        await ctx.db.replace(userToDelete._id, userToDelete);
},


}) 