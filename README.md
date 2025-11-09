# Teacher Tribute Backend

## Setup Instructions

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
npm run dev
```

3. Seed the database (run once):
```bash
curl -X POST http://localhost:5000/api/seed
```

4. Access Teacher Dashboard:
Open `backend/views/teacher-dashboard.html` in your browser

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Add new message
- `PUT /api/messages/:id/reply` - Teacher reply to message
- `GET /api/memories` - Get all memories
- `POST /api/memories` - Add new memory
- `POST /api/seed` - Seed initial data

## MongoDB Connection

Connected to: Cluster0.drxa4k1.mongodb.net
Database: teacher-tribute
