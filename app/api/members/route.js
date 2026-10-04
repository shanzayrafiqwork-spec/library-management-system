import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Member from '@/models/Member';

export async function GET() {
  try {
    await dbConnect();

    const members = await Member.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: members.length,
        members,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET MEMBERS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || 'Members fetch failed.',
      },
      { status: 500 }
    );
  }
}