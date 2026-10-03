
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '../../../models/Transaction';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      shippingAddress,
      items,
      totalAmount,
    } = body;

    // ===============================
    // VALIDATION
    // ===============================

    if (
      !customerName ||
      !email ||
      !phone ||
      !shippingAddress ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Checkout details missing hain.',
        },
        { status: 400 }
      );
    }

    // ===============================
    // CONVERT CHECKOUT ITEMS
    // TO TRANSACTION ITEMS
    // ===============================

    const transactionItems = items.map((item) => ({
      book: item.novelId,
      title: item.title,
      price: Number(item.price || 1200),
      quantity: Number(item.quantity || 1),
    }));

    // ===============================
    // SAVE ORDER IN MONGODB
    // ===============================

    const newOrder = await Transaction.create({
      member: null,

      customerDetails: {
        fullName: customerName,
        phone: phone,
        city: 'Karachi',
        address: shippingAddress,
      },

      items: transactionItems,

      subtotal: Number(totalAmount),

      deliveryCharges: 0,

      grandTotal: Number(totalAmount),

      paymentMethod: 'cod',

      transactionId: '',

      status: 'Pending',
    });

    // ===============================
    // SUCCESS RESPONSE
    // ===============================

    return NextResponse.json(
      {
        success: true,
        message: 'Order successfully place ho gaya hai!',
        data: {
          _id: newOrder._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('ORDER API ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Order process nahi ho saka.',
      },
      { status: 500 }
    );
  }
}

// ===============================
// GET ALL ORDERS
// ===============================

export async function GET() {
  try {
    await dbConnect();

    const orders = await Transaction.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: orders.length,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET ORDERS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Orders fetch nahi ho sake.',
      },
      { status: 500 }
    );
  }
}

