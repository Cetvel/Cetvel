import { NextResponse } from 'next/server';

// GET request handler
export async function GET(request: Request) {
    // API'den veri çekme
    const fetchedData = await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json());
      
    // Dönüş yapılacak veri
    const data = { message: 'Hello, Omer!', todo: fetchedData };
  
    return NextResponse.json(data, { status: 200 });
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
