import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'bg-pastel-pink'
    },
    teacherReply: {
        type: String,
        default: ''
    },
    hasReply: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    repliedAt: {
        type: Date
    }
});

export default mongoose.model('Message', messageSchema);
