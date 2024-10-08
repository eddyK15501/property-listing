import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    recipient: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    property: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    name: {
      required: [true, 'Name is required'],
      type: String,
    },
    email: {
      required: [true, 'Email is required'],
      type: String,
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
