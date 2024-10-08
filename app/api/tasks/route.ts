import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import TodoModel from '@/lib/models/todo.model';
import { ITodoDocument } from '@/lib/models/todo.model';
import connectDB from '@/lib/config/connectDB';

export async function GET(request: NextRequest) {

	if (!getAuth(request).userId) {
		return NextResponse.json({ error: 'Yetkilendirme Hatası' }, { status: 401 });
	}

	try {

		await connectDB()
		const todos = await TodoModel.find({ kindeId: getAuth(request).userId });
		return NextResponse.json(todos, {
			headers: {
				'X-Cache-Status': 'MISS',
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		if (!body) {
			return NextResponse.json(
				{ error: 'Request body is empty' },
				{ status: 400 }
			);
		}
		const kindeUser = await getUser();
        const userId = kindeUser?.id;
		if (!userId) {
			return NextResponse.json({ error: 'Yetkilendirme Hatası' }, { status: 401 });
		}

		if (!body.tag)
			return NextResponse.json({ error: 'Etiket gereklidir' }, { status: 400 });

		// Todo oluştur
		const todo = new TodoModel({
			kindeId: getAuth(request).userId,
			...body,
		}) as ITodoDocument;

		await todo.save();
		const response = NextResponse.json({ status: 200 });
		response.headers.set(
			'Cache-Control',
			's-maxage=60, stale-while-revalidate'
		);
		return response;
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}