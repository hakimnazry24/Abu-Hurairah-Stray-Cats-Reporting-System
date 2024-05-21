import express from "express";
import ViteExpress from "vite-express";
import sqlite3 from "sqlite3";
import multer from "multer";
import cors from "cors";
import 'dotenv/config'

const db = new sqlite3.Database("./database.db");
const upload = multer({ dest: "uploads/" });

export type Report = {
  id: number;
  image: string;
  location_1: string;
  location_2: string;
  location_3: string;
  contact_number: string;
  email_address: string;
  description: string;
  status: "Need for Review" | "Reviewed" | "Report complete";
  date_created: Date;
};

const app = express();
app.use(cors());
app.use(express.json());

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Report (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image BLOB NOT NULL,
    location_1 TEXT NOT NULL,
    location_2 TEXT NOT NULL,
    location_3 TEXT NOT NULL,
    contact_number STRING NOT NULL,
    email_address STRING NOT NULL,
    description STRING NOT NULL,
    status STRING NOT NULL,
    date_created DATETIME NOT NULL
  )`,
    (error) => {
      console.log("Successfully create Report table");
    }
  );
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post("/api/submit-report", upload.single("cat_image"), (req, res, next) => {
  const current_date = new Date().getDate;

  const cat_image = req.file;
  const {
    location_1,
    location_2,
    location_3,
    contact_number,
    email_address,
    description,
  }: Report = req.body;

  console.log(cat_image);
  console.log(location_1);
  console.log(location_2);
  console.log(location_3);
  console.log(contact_number);
  console.log(email_address);
  console.log(description);

  db.run(
    "INSERT INTO Report (image, location_1, location_2, location_3, contact_number, email_address, description, status, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      cat_image,
      location_1,
      location_2,
      location_3,
      contact_number,
      email_address,
      description,
      "Need for Review", //default value
      current_date,
    ],
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

app.get("/api/report/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM Report WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.log(`cannot read report ID ${id}`);
      return res.sendStatus(500);
    }

    if (row) {
      return res.send(row);
    } else {
      return res.sendStatus(404);
    }
  });
});

app.get("/api/reports", (req, res) => {
  db.all("SELECT * FROM Report", (err, rows) => {
    if (err) {
      console.log("Something wrong with getting Reports");
      return res.sendStatus(500);
    }

    if (rows) {
      return res.send(rows);
    } else {
      console.log("Reports not found");
      return res.sendStatus(404);
    }
  });
});

app.post("/api/change-status", (req, res) => {
  const { id, status }: Report = req.body;

  db.run("UPDATE Report SET status = ? WHERE id = ?", [status, id], (error) => {
    if (error) {
      console.log("Cannot change status of report due to server problem");
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });
});

const PORT: number = parseInt(process.env.PORT!);
ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000...")
);
