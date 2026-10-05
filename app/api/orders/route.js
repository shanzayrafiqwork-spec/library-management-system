import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Transaction from '@/models/Transaction';
import Member from '@/models/Member';
import Book from '@/models/Book';

export async function POST(request) {
  try {
    await dbConnect();

    // Make sure Mongoose registers these models
    Member;
    Book;

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
      paymentMethod,
    } = body;

    if (
      !memberId ||
      !customerName ||
      !email ||
      !phone ||
      !shippingAddress ||
      !city ||
      !items ||
      items.length === 0 ||
      totalAmount === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Checkout details are missing.',
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid member ID.',
        },
        { status: 400 }
      );
    }

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

    const transactionItems = items.map((item) => ({
      book: item.novelId,
      title: item.title,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    }));

    const selectedPaymentMethod =
      paymentMethod === 'wallet'
        ? 'wallet'
        : paymentMethod === 'bank'
        ? 'bank'
        : 'cod';

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

      paymentMethod: selectedPaymentMethod,

      transactionId: '',

      status: 'Pending',
    });

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

export async function GET(request) {
  try {
    await dbConnect();

    // Make sure Member and Book models are registered
    Member;
    Book;

    const { searchParams } = new URL(request.url);

    const memberId = searchParams.get('memberId');

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
        .populate('items.book', 'title author price coverImage')
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

    const orders = await Transaction.find({})
      .populate('member', 'fullName email phone')
      .populate('items.book', 'title author price coverImage')
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