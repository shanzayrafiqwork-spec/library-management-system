
import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Member from '@/models/Member';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const member = await Member.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!member) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (member.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: 'Login successful.',
        member: {
          id: member._id,
          fullName: member.fullName,
          email: member.email,
          phone: member.phone,
          role: member.role,
          address: member.address,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);

    return NextResponse.json(
      { message: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}

