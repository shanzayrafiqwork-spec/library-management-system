import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      memberId,
      customerName,
      customerEmail,
      bookId,
      bookTitle,
      rating,
      message,
    } = body;

    if (
      !memberId ||
      !customerName ||
      !customerEmail ||
      !bookId ||
      !bookTitle ||
      !rating ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill all review fields.',
        },
        { status: 400 }
      );
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rating must be between 1 and 5.',
        },
        { status: 400 }
      );
    }

    const review = await Review.create({
      member: memberId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      book: bookId,
      bookTitle: bookTitle.trim(),
      rating: Number(rating),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully.',
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('REVIEW POST ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to submit review.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate('member', 'fullName email')
      .populate('book', 'title price image');

    return NextResponse.json(
      {
        success: true,
        reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('REVIEW GET ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load reviews.',
      },
      { status: 500 }
    );
  }
}