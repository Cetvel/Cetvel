import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Todo from '@/lib/models/todo.model';
import Pomodoro from '@/lib/models/pomodoro.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from '@/lib/config/connectDB';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

interface TagCount {
  tag: string;
  count: number;
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('Connected to database');

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recentTodos = await Todo.find(
      { clerkId: userId, createdAt: { $gte: oneWeekAgo } },
      { title: 1, tag: 1, status: 1, description: 1, _id: 0 }
    ).lean();
    console.log('Recent todos fetched:', recentTodos.length);

    const recentPomodoros = await Pomodoro.find(
      { clerkId: userId, startsAt: { $gte: oneWeekAgo } },
      { title: 1, tag: 1, duration: 1, description: 1, _id: 0 }
    ).lean();
    console.log('Recent pomodoros fetched:', recentPomodoros.length);

    // Tag analizi
    const tagAnalysis = [...recentTodos, ...recentPomodoros].reduce<Record<string, number>>((acc, item) => {
      acc[item.tag] = (acc[item.tag] || 0) + 1;
      return acc;
    }, {});

    const sortedTags: TagCount[] = Object.entries(tagAnalysis)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    const prompt = `
      My task and pomodoro list for the last week:

      Tasks: ${JSON.stringify(recentTodos, null, 2)}

      Pomodoros: ${JSON.stringify(recentPomodoros, null, 2)}

      Tag Analysis: ${JSON.stringify(sortedTags, null, 2)}

      Based on this data, please suggest 3 tasks considering the following criteria:

      1. Prioritize topics that were studied the least (according to tag analysis).
      2. Consider incomplete tasks.
      3. Analyze work intensity based on pomodoro durations.
      4. Detail each suggestion, focusing on a specific topic or concept.
      5. Include a brief explanation of why you are recommending this topic for each suggestion.

      Example suggestion format:
      {
        "title": "Identify 5 different types of derivatives in the calculus topic. Solve 3 questions for each type and write the solution steps in detail. Then solve 25 derivative questions and time yourself.",
        "tag": "Mathematics"
      }

      Please respond clearly and specifically, in plain JSON format and in Turkish. Do not use Markdown code blocks, only provide pure JSON.

    `;

    console.log('Prompt created, calling Gemini API');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await model.generateContent(prompt);
    console.log('Gemini API response received');

    const text = result.response.text();
    console.log('Gemini API response text:', text);

    let parsedResponse;
    try {
      // Remove any potential markdown code block syntax
      const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
      console.log('Parsed response:', parsedResponse);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      return NextResponse.json(
        { error: 'Invalid JSON response from AI model', details: (error as Error).message },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}