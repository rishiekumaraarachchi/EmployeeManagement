import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "signup",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL Connected...");
  }
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ Status: "Failed", Error: "Error in running query" });
    }
    if (result.length > 0) {
      return res.json({ Status: "Success", message: "Login Successful" });
    } else {
      return res.json({
        Status: "Failed",
        message: "Login Failed",
        Error: "Invalid Email or Password",
      });
    }
  });
});

app.listen(8081, () => {
  console.log("running server");
});
