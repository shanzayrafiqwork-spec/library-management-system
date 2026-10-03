import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
    },
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
    address: {
      city: String,
      streetAddress: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);