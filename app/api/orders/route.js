
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Transaction from '../../../models/Transaction';

// ==========================================
// POST: Create New Order
// ==========================================

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      memberId,
      customerName,
      email,
      phone,
      shippingAddress,
      city,
      items,
      totalAmount,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !memberId ||
      !customerName ||
      !email ||
      !phone ||
      !shippingAddress ||
      !city ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Checkout details are missing.',
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CHECK MEMBER ID
    // ==========================================

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid member ID.',
        },
        { status: 400 }
      );
    }

    // ==========================================
    // CHECK BOOK IDs
    // ==========================================

    for (const item of items) {
      if (!item.novelId) {
        return NextResponse.json(
          {
            success: false,
            message: `Book ID is missing for ${
              item.title || 'selected book'
            }.`,
          },
          { status: 400 }
        );
      }

      if (!mongoose.Types.ObjectId.isValid(item.novelId)) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid Book ID for ${
              item.title || 'selected book'
            }.`,
          },
          { status: 400 }
        );
      }
    }

    // ==========================================
    // CONVERT ITEMS
    // ==========================================

    const transactionItems = items.map((item) => ({
      book: item.novelId,
      title: item.title,
      price: Number(item.price || 1200),
      quantity: Number(item.quantity || 1),
    }));

    // ==========================================
    // SAVE ORDER
    // ==========================================

    const newOrder = await Transaction.create({
      member: memberId,

      customerDetails: {
        fullName: customerName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: shippingAddress.trim(),
      },

      items: transactionItems,

      subtotal: Number(totalAmount),

      deliveryCharges: 0,

      grandTotal: Number(totalAmount),

      paymentMethod: 'cod',

      transactionId: '',

      status: 'Pending',
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        message: 'Order successfully placed!',
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
        message:
          error.message || 'Order process failed.',
      },
      { status: 500 }
    );
  }
}

// ==========================================
// GET: Orders
// ==========================================

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const memberId = searchParams.get('memberId');

    // ==========================================
    // MEMBER ORDERS
    // ==========================================

    if (memberId) {
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid member ID.',
          },
          { status: 400 }
        );
      }

      const orders = await Transaction.find({
        member: memberId,
      })
        .populate('member', 'fullName email phone')
        .sort({ createdAt: -1 });

      return NextResponse.json(
        {
          success: true,
          count: orders.length,
          orders,
        },
        { status: 200 }
      );
    }

    // ==========================================
    // ALL ORDERS
    // ==========================================

    const orders = await Transaction.find({})
      .populate('member', 'fullName email phone')
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
        message:
          error.message || 'Orders fetch failed.',
      },
      { status: 500 }
    );
  }
}

