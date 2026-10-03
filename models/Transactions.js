import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    // Agar member logged in ho to user ID attach hogi (Optional)
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: false,
    },
    customerDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      default: 250,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'wallet', 'bank'],
      required: true,
    },
    transactionId: {
      type: String, // JazzCash / EasyPaisa / Bank reference number
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);