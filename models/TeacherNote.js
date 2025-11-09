import mongoose from 'mongoose';

const teacherNoteSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    default: 'Mr. Yasir'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TeacherNote', teacherNoteSchema);
