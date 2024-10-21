import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user.model";
import Pomodoro from "@/lib/models/pomodoro.model";
import Todo from "@/lib/models/todo.model";
import Exam from "@/lib/models/exam.model";
import Goal from "@/lib/models/goal.model";
import Tag from "@/lib/models/tag.model";
import connectDB from "@/lib/config/connectDB";

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken || typeof decodedToken === 'string') {
      throw new Error('Invalid token');
    }
    const { header } = decodedToken;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as jwt.JwtPayload;

    // Handle various events
    switch (event?.type) {
      case "user.updated":

        const { user: updatedUser } = event.data;
        await connectDB();
        await User.findOneAndUpdate(
          { kindeId: updatedUser.id },
          { name: updatedUser.first_name, ...updatedUser })
        break;
      case "user.created":
        const { user } = event.data
        await connectDB();
        await User.create(
          {
            email: user.email,
            name: user.first_name,
            kindeId: user.id,
            password: user.password
          }
        ).then(() => console.log('User created'));
        break;
      case "user.deleted":
        const { user: deletedUser } = event.data;
        await connectDB();
        await User.findOneAndDelete({ kindeId: deletedUser.id }).then(() => console.log('User deleted'));
        await Pomodoro.deleteMany({ kindeId: deletedUser.id }).then(() => console.log('Pomodoros deleted'));
        await Todo.deleteMany({ kindeId: deletedUser.id }).then(() => console.log('Todos deleted'));
        await Exam.deleteMany({ kindeId: deletedUser.id }).then(() => console.log('Exams deleted'));
        await Goal.deleteMany({ kindeId: deletedUser.id }).then(() => console.log('Goals deleted'));
        await Tag.deleteMany({ kindeId: deletedUser.id }).then(() => console.log('Tags deleted'));

        break;
      default:
        break;
    }

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}