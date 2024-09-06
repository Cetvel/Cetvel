import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Todo from "@/lib/models/todo.model";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import connectDB from "@/lib/config/connectDB";
if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        await connectDB();
        const recentTodos = await Todo.find(
            { clerkId: userId, createdAt: { $gte: oneWeekAgo } },
            { title: 1, tag: 1, status: 1, _id: 0 }
        );

        const prompt = `
            Here is my last week todo list: ${JSON.stringify(recentTodos)}.
            Can you give me 3 todo suggestions according to them?
            I want you to advise me on a topic that I am weak in and suggest me a specific topic and explain why you are suggesting it. I don't want simple suggestions like "Study math" or "Read a book".
            Here is an example suggestion:
            {
                "title": "When studying limits, identify 5 different types of limits. Solve 3 questions for each type and write the solution steps in detail. Then solve 25 limit questions and time them.",
                "tag": "Physics",
                "message": "According to your recent work, you don't solve questions about limits. I suggest you solve questions about limits again. It is good to solve 5 different types of limits and write the solution steps in detail. Then solve 25 limit questions and time them. This will help you to improve your limit-solving skills.",
            }
            Note that the topic I am weak at according to my todos, which I do rarely, then give me advice to improve them.
            The answer should be clear and specific, in JSON format, and in Turkish.
        `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a student coach and supposed to generate 3 todo suggestions according to my last week todo list.",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: {
                                type: SchemaType.STRING,
                            },
                            message: {
                                type: SchemaType.STRING,
                            },
                            tag: {
                                type: SchemaType.STRING,
                            }
                        },
                    },
                },
            }
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Validate and parse the JSON response
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(text);
        } catch (error) {
            return NextResponse.json({ error: "Invalid JSON response from AI model" }, { status: 500 });
        }

        return NextResponse.json(parsedResponse,{status:200});
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
