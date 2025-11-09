import mongoose from 'mongoose';

const memorySchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    default: 'Students'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Memory', memorySchema);
