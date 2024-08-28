import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import Todo from "@/lib/models/todo.model";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";


if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a student coach and supposed to generate 3 todo suggestions according to my last week todo list. ",
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

export async function GET() {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const todos = await Todo.find(
            { clerkId: userId, createdAt: { $gte: oneWeekAgo } },
            { title: 1, tag: 1, status: 1, _id: 0 }
        );
        console.log("prompt todos: ", todos);
        const prompt = `
		Here is my last week todo list: ${todos}.
		Can you give me 3 todo suggestions according to them?
		I want you to advise me on a topic that I am weak in. I don't want simple suggestions like "Study math" or "Read a book".
		I want you to suggest me a specific topic and explain why you are suggesting it.
		 Here is an example suggestion :
		{
        "title": "When studying limits, identify 5 different types of limits. Solve 3 questions for each type and write the solution steps in detail. Then solve 25 limit questions and time them.",
        "tag": "Physics",
        "message": "According to your recent work, you don't solve questions about limits. I suggest you solve questions about limits again. It is good to solve 5 different types of limits and write the solution steps in detail. Then solve 25 limit questions and time them. This will help you to improve your limit solving skills.",
 	   },
	   {
  	"title": "Create mind maps for each major topic in your weakest subject",
  	"tag": "Study Technique",
  	"message": "Mind mapping is a powerful visual tool that can significantly enhance your understanding and retention of complex subjects. By creating mind maps for your weakest subject, you're forcing yourself to identify key concepts and their relationships. This process helps in organizing information in a way that mirrors how your brain naturally processes it. It's particularly effective for subjects with many interconnected ideas. Moreover, the visual nature of mind maps makes it easier to recall information during the test, potentially improving your performance in areas you previously struggled with."}
	},
	 {
    "title": "Practice mental math for 15 minutes daily",
    "tag": "Mathematics",
    "message": "Developing strong mental math skills can significantly improve your speed and accuracy in the math section of standardized tests. Regular practice enhances your ability to perform quick calculations without relying on a calculator, saving precious time during the exam. This skill is particularly useful for estimation questions and can help you quickly check your answers for reasonableness."
  },
  {
    "title": "Solve 5 logic puzzles or brain teasers every week",
    "tag": "Critical Thinking",
    "message": "Logic puzzles and brain teasers enhance your problem-solving skills and analytical thinking. These are crucial for many sections of standardized tests, particularly in mathematics and science. Regular practice with such puzzles can improve your ability to approach complex problems methodically and think outside the box."
  },
  {
    "title": "Create flashcards for scientific terms and review them daily",
    "tag": "Science",
    "message": "Science sections often require quick recall of specific terms and concepts. Flashcards are an effective tool for memorizing these efficiently. Daily review ensures that the information stays fresh in your memory and helps you build a strong foundation of scientific vocabulary, which is crucial for understanding and answering science questions accurately."
  },
  {
    "title": "Write a short essay on a random topic every week",
    "tag": "Writing Skills",
    "message": "Regular essay writing practice improves your ability to organize thoughts quickly and express them clearly – essential skills for any writing section in standardized tests. Choosing random topics challenges you to think creatively and construct arguments on unfamiliar subjects, preparing you for any essay prompt you might encounter in the exam."
  },
  {
    "title": "Teach a difficult concept to a friend or family member",
    "tag": "Deep Understanding",
    "message": "Explaining complex ideas to others is one of the best ways to solidify your own understanding. This practice forces you to break down difficult concepts into simpler terms, which can help you grasp them more thoroughly. It also highlights any areas where your understanding might be lacking, allowing you to focus your study efforts more effectively."
  },
  {
    "title": "Create a 'mistake log' and review it weekly",
    "tag": "Error Analysis",
    "message": "Keeping track of the mistakes you make during practice and analyzing them regularly is a powerful way to prevent repeating those errors. A mistake log helps you identify patterns in your errors, allowing you to focus on specific areas that need improvement. Regular review of this log reinforces the correct approaches and helps you avoid common pitfalls during the actual test."
  },

	   Note that topic I am weak according to my todos which I do rarely, then give me an advice to improve them
	   Answer shouldn't have to much "If it is hard for you" or "If you want to" etc. It should be clear and specific.
	   Give me 3 todo suggestions.
	   Answer me with JSON format and the answer should be in turkish
	  `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // JSON formatını doğrula ve parse et
        const parsedResponse = JSON.parse(text);
        return NextResponse.json(parsedResponse);
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
