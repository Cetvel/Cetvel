import { v } from "convex/values";
import { action, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
export const createUser = action({
    args: { 
        clerkId: v.string(),
        mongoId: v.string(),
        name : v.string()
    },
    handler: async (ctx, { clerkId, mongoId, name }) => {
        const newUser  = await ctx.runMutation(internal.user.userPreference.insertUser, { clerkId, mongoId, name });
        console.log("new User" , newUser)
        await ctx.runMutation(internal.user.userPreference.createUserPreference, { clerkId, userId: newUser });
        if (!newUser) {
            throw new Error("User could not be created")
        }

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