import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Message from './models/Message.js';
import Memory from './models/Memory.js';
import TeacherNote from './models/TeacherNote.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new message from student
app.post('/api/messages', async (req, res) => {
  try {
    const { studentName, message, color } = req.body;
    const newMessage = new Message({
      studentName,
      message,
      color: color || 'bg-pastel-pink'
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Teacher reply to a message
app.put('/api/messages/:id/reply', async (req, res) => {
  try {
    const { teacherReply } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        teacherReply,
        hasReply: true,
        repliedAt: new Date()
      },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all memories
app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new memory
app.post('/api/memories', async (req, res) => {
  try {
    const { caption, imageUrl, uploadedBy } = req.body;
    const newMemory = new Memory({
      caption,
      imageUrl,
      uploadedBy: uploadedBy || 'Students'
    });
    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all teacher's notes
app.get('/api/teacher-note', async (req, res) => {
  try {
    const notes = await TeacherNote.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add or update teacher's note
app.post('/api/teacher-note', async (req, res) => {
  try {
    const { message, teacherName } = req.body;
    const newNote = new TeacherNote({
      message,
      teacherName: teacherName || 'Mr. Yasir'
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed initial data (run once)
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Message.deleteMany({});
    await Memory.deleteMany({});

    // Seed messages from the screenshot
    const messages = [
      {
        studentName: "Tushar Kumar",
        message: "Dear Sir, thank you for being an incredible mentor and guide. Your teachings have inspired me to pursue my passion for coding. This tribute is a small token of our immense gratitude. Wishing you all the success and happiness ahead!",
        color: "bg-pastel-green"
      },
      {
        studentName: "Irfana",
        message: "Thank you so much sir....For all yours efforts and teaching...You will always be our favourite and forever remembered",
        color: "bg-pastel-pink"
      },
      {
        studentName: "Varshini",
        message: "Thank you so much sir",
        color: "bg-pastel-blue"
      },
      {
        studentName: "Shaik Sufya",
        message: "Thank you, sir, for your dedication and kindness. We're grateful to have a teacher like you always our favourite and never forgotten.",
        color: "bg-pastel-purple"
      },
      {
        studentName: "Yakshasowmyavuyyuru",
        message: "Thank u so much sir for your patience",
        color: "bg-pastel-yellow"
      }
    ];

    await Message.insertMany(messages);

    // Seed memories with the classroom photos
    const memories = [
      {
        caption: "Our Amazing Class",
        imageUrl: "/images/WhatsApp Image 2025-10-22 at 14.03.59_75b5e080.jpg",
        uploadedBy: "Students"
      },
      {
        caption: "Memorable Moments",
        imageUrl: "/images/WhatsApp Image 2025-11-09 at 10.51.06_1e69b071.jpg",
        uploadedBy: "Students"
      }
    ];

    await Memory.insertMany(memories);

    res.json({ message: 'Database seeded successfully with all messages and memories!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
