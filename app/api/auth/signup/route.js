
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Member from '@/models/Member';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      fullName,
      email,
      password,
      phone,
    } = body;

    // ===============================
    // VALIDATION
    // ===============================

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Full Name, Email, Password aur Phone required hain.',
        },
        { status: 400 }
      );
    }

    // ===============================
    // CHECK EXISTING MEMBER
    // ===============================

    const existingMember = await Member.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingMember) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ye email already registered hai. Please login karein.',
        },
        { status: 409 }
      );
    }

    // ===============================
    // CREATE MEMBER
    // ===============================

    const newMember = await Member.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone.trim(),
      role: 'member',
    });

    // ===============================
    // SUCCESS
    // ===============================

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successfully ho gaya!',
        member: {
          id: newMember._id,
          fullName: newMember.fullName,
          email: newMember.email,
          phone: newMember.phone,
          role: newMember.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('SIGNUP ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Signup nahi ho saka.',
      },
      { status: 500 }
    );
  }
}

