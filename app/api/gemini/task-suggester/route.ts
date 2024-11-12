import { NextResponse } from 'next/server';
import Todo from '@/features/tasks/models/todo.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
   
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import TasksLoader from '@/features/tasks/loaders/tasks-loader';
import { title } from 'process';
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}
const { getUser } = getKindeServerSession();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'tunedModels/todosuggester-aisodt4kjxgr'
  // model : 'gemini-1.5-flash'
});



export async function GET() {
  try {
    const kindeUser = await getUser();
    const userId = kindeUser.id;
    if (!userId) {
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
       ;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentTodos = await Todo.find(
      { kindeId: userId, createdAt: { $gte: oneWeekAgo } },
      {title: 1, tag: 1,status: 1, startsAt: 1}
    )
      // const recentGoals = await Goal.find(
    //   { kindeId: userId },
    //   { title: 1, totalUnits: 1, completedUnits: 1 }
    // );
    // const recentTags = await Tag.find(
    //   { kindeId: userId },
    //   { value: 1 }
    // )
    const prompt = `
     ${JSON.stringify(recentTodos, null, 2)}
      Suggest 3 todos according to aboves. The answer should be like this structure
      [{"title": "", "tag": ""}]
      i just want to get the json array and the answers must be Turkish. do not write another sentence.
    `;


    const result = await model.generateContent(prompt)
    const text = result.response.text();
    const tasks = JSON.parse(text);
    console.log("Tasks", tasks)
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error in GET function:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}
