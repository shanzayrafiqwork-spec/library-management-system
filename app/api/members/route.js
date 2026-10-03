import dbConnect from '@/lib/dbConnect';
import Member from '@/models/Member';
import { NextResponse } from 'next/server';

// 1. Get All Registered Members
export async function GET() {
  try {
    await dbConnect();
    const members = await Member.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: members }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. Register New Member
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const member = await Member.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}