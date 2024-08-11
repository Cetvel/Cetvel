import { NextResponse } from 'next/server';

// GET request handler
export async function GET(request: Request) {
  
    return NextResponse.json({deathMessage : "What the f**k are you doing here?!💀"});
  }

// POST request handler
export async function POST(request: Request) {
  const body = await request.json();
  // Here, you can process the incoming data (e.g., save to a database)
  const responseData = { message: 'User data received', data: body };
  return NextResponse.json(responseData, { status: 201 });
}

// PUT request handler
export async function PUT(request: Request) {
  const body = await request.json();
  // Here, you can update user data
  const responseData = { message: 'User data updated', data: body };
  return NextResponse.json(responseData, { status: 200 });
}

// DELETE request handler
export async function DELETE(request: Request) {
  // Here, you can delete user data
  const responseData = { message: 'User data deleted' };
  return NextResponse.json(responseData, { status: 204 });
}
