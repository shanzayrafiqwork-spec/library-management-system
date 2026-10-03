import dbConnect from '@/lib/dbConnect';
import Member from '@/models/Member';

import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const updatedNovel = await Novel.findByIdAndUpdate(id, body, { new: true });

    if (!updatedNovel) {
      return NextResponse.json({ success: false, error: 'Novel not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedNovel }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}