// install relevant packages for access sqlite DB
// import mysql from 'mysql2/promise';

// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });


// sqlite connections
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function getDB() {
  if (!db) {
    db = await open({
      filename: './data.db', 
      driver: sqlite3.Database,
    });

    // Load schema at runtime
    const schema = await fetchSchema(); 
    await db.exec(schema);
  }
  return db;
}

async function fetchSchema() {
  const fs = await import('fs/promises');
  return await fs.readFile('sql/schema.sql', 'utf-8');
}
