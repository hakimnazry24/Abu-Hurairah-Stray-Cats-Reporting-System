import express from "express";
import ViteExpress from "vite-express";
import sqlite3 from "sqlite3";
import multer from "multer";
import { error } from "console";

const db = new sqlite3.Database("./database.db");
const upload = multer()

type Report = {
  image: string;
  location_1: string;
  location_2: string;
  location_3: string;
  contact_number: string;
  email_address: string;
  description: string;
};

const app = express();
app.use(express.json());

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image STRING NOT NULL,
    location_1 TEXT NOT NULL,
    location_2 TEXT NOT NULL,
    location_3 TEXT NOT NULL,
    contact_number STRING NOT NULL,
    email_address STRING NOT NULL,
    description STRING NOT NULL
  )`,
    (error) => {
      console.log("Successfully create Report table");
    }
  );
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post("/api/submit-report", (req, res) => {
  const {
    image,
    location_1,
    location_2,
    location_3,
    contact_number,
    email_address,
    description,
  }: Report = req.body;

  console.log(image);
  console.log(location_1);
  console.log(location_2);
  console.log(location_3);
  console.log(contact_number);
  console.log(email_address);
  console.log(description);

  db.run(
    "INSERT INTO Report (image, location_1, location_2, location_3, contact_number, email_address, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    (error) => {
      if (error) {
        console.log("server side problem. cannot add report into database");
        console.log(error.message);
        return res.sendStatus(500);
      }
      console.log("successfully add report into database");
      return res.sendStatus(200);
    }
  );
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
