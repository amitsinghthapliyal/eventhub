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
1. Added lazy loading and pagination on UI & apis to reduce payload size.
2. Optimized sql queries.
3. Reduced API response size by excluding redundant data, leading to faster client-side rendering and lower bandwidth usage.

---


## 3. Directory Structure
```text
eventhub/
├── lib/
│   └── db.ts                 # Utility to handle SQLite database connection and queries.
│
├── pages/
│   ├── api/
│   │   ├── events/
│   │   │   ├── [id].ts       # API route to fetch a single event by ID.
│   │   │   └── index.ts      # API route to fetch all events.
│   │   └── register.ts       # API route to handle event registration submissions.
│   │
│   ├── admin/
│   │   └── dashboard.tsx      # Admin dashboard page showing analytics like popular events and daily stats.
│
│   ├── events/
│   │   ├── [id].tsx          # Frontend page to display details for a specific event.
│   │   └── index.tsx         # Frontend page to list all upcoming events.
│
│   └── _app.tsx              # Custom App component to initialize pages and global styles.
│
├── sql/
│   ├── schema.sql            # SQL script to define database schema (tables, fields).
│
├── styles/
│   └── globals.css           # Global CSS styles including Tailwind directives.
│
├── data.db                   # SQLite database file storing all event and registration data.
├── Document.md              
├── README.md                 
├── next-env.d.ts            
├── package-lock.json         
├── package.json              
├── postcss.config.js         # PostCSS configuration used with Tailwind CSS.
├── tailwind.config.js        # Tailwind CSS configuration file.
└── tsconfig.json            
```
           


---

## 4. Conclusion
This implementation prioritizes clarity, performance, and scalability. With raw SQL optimizations, modular frontend, the system is well-equipped to handle large datasets and high concurrency.
