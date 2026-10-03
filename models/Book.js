import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price in PKR'],
    },
    coverImage: {
      type: String,
      default: '/placeholder-book.png',
    },
    genre: {
      type: String,
      default: 'Urdu Novel',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 10,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);