import { NextResponse } from 'next/server';
import Todo from '@/lib/models/todo.model';
import Pomodoro from '@/lib/models/pomodoro.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from '@/lib/config/connectDB';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const { getUser } = getKindeServerSession();
interface TagCount {
  tag: string;
  count: number;
}

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

    await connectDB();
    console.log('Connected to database');

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const recentTodos = await Todo.find(
      { kindeId: userId, createdAt: { $gte: oneWeekAgo } },
      { title: 1, tag: 1, status: 1, description: 1, _id: 0 }
    ).lean();
    console.log('Recent todos fetched:', recentTodos.length);

    const recentPomodoros = await Pomodoro.find(
      { kindeId: userId, startsAt: { $gte: oneWeekAgo } },
      { title: 1, tag: 1, duration: 1, description: 1, _id: 0 }
    ).lean();
    console.log('Recent pomodoros fetched:', recentPomodoros.length);

    // Tag analizi
    const tagAnalysis = [...recentTodos, ...recentPomodoros].reduce<
      Record<string, number>
    >((acc, item) => {
      acc[item.tag] = (acc[item.tag] || 0) + 1;
      return acc;
    }, {});

    const sortedTags: TagCount[] = Object.entries(tagAnalysis)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    const prompt = `
      Benim görevlerim, etiketlerim ve odaklanma oturumlarım şu şekilde:

      Görevlerim: ${JSON.stringify(recentTodos, null, 2)}

      Odaklanma oturumlarım: ${JSON.stringify(recentPomodoros, null, 2)}

      Etiketlerim: ${JSON.stringify(sortedTags, null, 2)}

      Bu verilere dayanarak bana 10 tane görev önerisi yapabilir misiniz? Önerilerinizi yaparken şu kriterlere dikkat edin:

      - Görevlerin başlıkları fazla uzun olmasın
      - Etiketleri tutarlı olsun
      - Önceki görevleri ve odaklanma oturumlarını dikkate alın
      - Bir eğitim koçu gibi düşünün ve önerilerinizi ona göre yapın
      - Önerilerinizi JSON formatında aşağıdaki örnekteki gibi verin

      Örnek öneri formatı:
      {
        "title": "Örnek bir görev başlığı",
        "tag": "GÖrev etiketi",
      }

      Lütfen sade ve anlaşılır bir dil kullanın. JSON formatında döndürün.

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
        {
          error: 'Invalid JSON response from AI model',
          details: (error as Error).message,
        },
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
