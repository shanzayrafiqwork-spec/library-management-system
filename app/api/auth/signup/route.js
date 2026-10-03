import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Member from '@/models/Member';

export async function POST(request) {
  try {
    await dbConnect();
    const { fullName, email, password, phone } = await request.json();

    // Basic Validation
    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: 'Tamam fields fill karna zaroori hain.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingMember = await Member.findOne({ email: email.toLowerCase() });
    if (existingMember) {
      return NextResponse.json(
        { success: false, message: 'Yeh email pehle se registered hai.' },
        { status: 400 }
      );
    }

    // Create New Member
    const newMember = await Member.create({
      fullName,
      email: email.toLowerCase(),
      password, // Practical app me bcrypt se hash kar sakte hain
      phone,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account kamyabi se ban gaya hai!',
        user: {
          id: newMember._id,
          fullName: newMember.fullName,
          email: newMember.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error aagaya hai.' },
      { status: 500 }
    );
  }
}