import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '../../../../models/Transaction';

// 1. GET: Fetch Single Order by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const order = await Transaction.findById(id).populate('member', 'fullName email phone');

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order nahi mila.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid Order ID ya Server Error.' },
      { status: 500 }
    );
  }
}

// 2. PUT / PATCH: Update Order Status (e.g. Pending -> Confirmed -> Dispatched -> Delivered)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { status, transactionId } = await request.json();

    // Valid Status Check
    const allowedStatuses = ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided.' },
        { status: 400 }
      );
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (transactionId) updateFields.transactionId = transactionId;

    const updatedOrder = await Transaction.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: 'Order update nahi ho saka. Order ID ghalat hai.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order status kamyabi se update ho gaya!',
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error aagaya hai.' },
      { status: 500 }
    );
  }
}

// 3. DELETE: Cancel or Delete Order
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedOrder = await Transaction.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, message: 'Order nahi mila.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Order kamyabi se delete/cancel ho gaya hai.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server Error: Order delete nahi ho saka.' },
      { status: 500 }
    );
  }
}