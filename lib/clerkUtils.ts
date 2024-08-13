import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUserMetadata(metadata: Record<string, any>) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Kullanıcı kimliği alınamadı");
  }

  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: metadata
    });

    return updatedUser;
  } catch (error) {
    console.error("Metadata güncellenirken hata oluştu:", error);
    throw error;
  }
}
