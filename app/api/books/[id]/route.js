
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Book from '@/models/Book';

// UPDATE BOOK
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBook },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE BOOK
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Book deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

