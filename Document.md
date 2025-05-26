## 📌 Project: EventHub – Take Home Assignment

---

## 1. Project Overview & Key Decisions

This is a simplified event management web application built using **Next.js** and **SQLite (in-memory)**. The app allows users to:
- View and filter a list of upcoming events
- See event details
- Register for events
- (Admin only) View analytics for popular events and daily stats

---

## 2. Tech Stack & Setup

### Frontend
- **Next.js** with **React**
- **Tailwind CSS** for styling

### Backend
- **Next.js API Routes**
- **SQLite (in-memory)** — with ability to persist via file fallback if required
- **Raw SQL** used for maximum control and performance

### Setup Instructions
1. Configure `.env.local` (optional, since SQLite is in-memory)
2. Run `sql/schema.sql` to create tables
3. Install packages `npm install`
4. Start app: `npm run dev`

---

## 3. Performance Considerations
1. Added lazy loading and pagination on UI & apis to reduce payload size

---


## 3. Directory Structure changes
Added pages/admin/adshboard for admin analytics page

---

## 4. Conclusion
This implementation prioritizes clarity, performance, and scalability. With raw SQL optimizations, modular frontend, and attention to potential bottlenecks, the system is well-equipped to handle large datasets and high concurrency.
