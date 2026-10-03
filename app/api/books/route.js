
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Book from '@/models/Book';

// 1. GET All Books (With Author Filter Support)
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const author = searchParams.get('author');

    let query = {};

    if (author && author !== 'All') {
      query.author = author;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: books },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 2. POST Add New Book
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const book = await Book.create(body);

    return NextResponse.json(
      { success: true, data: book },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// 3. DELETE Book
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Book ID required' },
        { status: 400 }
      );
    }

    await Book.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Book deleted' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

