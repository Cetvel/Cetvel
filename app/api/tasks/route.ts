import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import TodoModel from '@/lib/models/todo.model';
import { ITodoDocument } from '@/lib/models/todo.model';
import connectDB from '@/lib/config/connectDB';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
const { getUser } = getKindeServerSession();

export async function GET(request: NextRequest) {
	try {

		const kindeUser = await getUser();
		const userId = kindeUser?.id;
		if (!userId) {
			return NextResponse.json({ error: 'Yetkilendirme Hatası' }, { status: 401 });
		}
		await connectDB()
		const todos = await TodoModel.find({ kindeId: userId });
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

		const kindeUser = await getUser();
		const userId = kindeUser?.id;
		if (!userId) {
			return NextResponse.json({ error: 'Yetkilendirme Hatası' }, { status: 401 });
		}

		const body = await request.json();
		if (!body.tag)
			return NextResponse.json({ error: 'Etiket gereklidir' }, { status: 400 });

		const todo = new TodoModel({
			kindeId: userId,
			...body,
		}) as ITodoDocument;

		await todo.save();
		return NextResponse.json({ status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}