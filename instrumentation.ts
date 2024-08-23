"use server"


let isDbConnected = false;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Database connection
    if (!isDbConnected) {
      try {
        const connectDB = (await import('./lib/config/config')).default;
        await connectDB();
        isDbConnected = true;
      } catch (error) {
        console.error('Failed to connect to database:', error);
      }
    }
  }
}