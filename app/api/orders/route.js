import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '@/models/Transaction';

// 1. POST: Save New Order / Transaction
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      member,
      customerDetails,
      items,
      subtotal,
      deliveryCharges,
      grandTotal,
      paymentMethod,
      transactionId,
    } = body;

    // Validation Check
    if (!customerDetails || !items || items.length === 0 || !grandTotal || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Order details missing hain.' },
        { status: 400 }
      );
    }

    // Save to Database
    const newOrder = await Transaction.create({
      member: member || null,
      customerDetails,
      items,
      subtotal,
      deliveryCharges: deliveryCharges || 250,
      grandTotal,
      paymentMethod,
      transactionId: transactionId || '',
      status: 'Pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Order successfully place ho gaya hai!',
        orderId: newOrder._id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Order process nahi ho saka.' },
      { status: 500 }
    );
  }
}

// 2. GET: Fetch All Orders (For Admin Dashboard)
export async function GET() {
  try {
    await dbConnect();
    
    // Recent orders sabse pehle fetch hongay
    const orders = await Transaction.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: orders.length, orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Orders fetch nahi ho sake.' },
      { status: 500 }
    );
  }
}