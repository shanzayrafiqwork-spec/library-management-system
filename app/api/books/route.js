import dbConnect from '@/lib/dbConnect';
import Novel from '@/models/Novel';
import { NextResponse } from 'next/server';

// 1. GET All Novels (With Writer Filter support)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const author = searchParams.get('author');

    let query = {};
    if (author && author !== 'All') {
      query.author = author;
    }

    const novels = await Novel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: novels }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. POST Add New Novel
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const novel = await Novel.create(body);
    return NextResponse.json({ success: true, data: novel }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 3. DELETE Novel
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Novel ID required' }, { status: 400 });
    }

    await Novel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Novel deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}