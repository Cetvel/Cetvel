import { NextRequest,NextResponse } from "next/server";
import NodeCache from "node-cache";
import { getAuth } from "@clerk/nextjs/server";
import TodoModel from "@/lib/models/todo.model";

const cache = new NodeCache({ stdTTL: 300 });

export async function GET(request: NextRequest) {
  const userId = getAuth(request).userId;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
    return NextResponse.json(
      { error: 'Geçersiz sayfa sayısı veya pageSize' },
      { status: 400 }
    );
  }

  // caching

  const skip = (page - 1) * pageSize;

  try {
    let query: any = { clerkId: userId };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
      ];
    }

    const totalTodos = await TodoModel.countDocuments(query);

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const todos = await TodoModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalPages = Math.ceil(totalTodos / pageSize);

    const result = {
      data: todos,
      meta: {
        total: totalTodos,
        page,
        pageSize,
        totalPages,
      },
    };


    return NextResponse.json(result);
  } catch (error) {
    // Error catching
  }
}