import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Cors from "cors";
dotenv.config();

import Messages from "./Schema/dbMessages.js";

//App config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_CONNECTION_URL;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose
  .connect(connection_url)
  .then(() =>
    app.listen(port, () =>
      console.log(`Connected to database and runner on PORT:${port}`)
    )
  )
  .catch((err) => console.log(err.message));

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/messages/new", (req, res) => {
  try {
    const dbMessage = req.body;
    res.status(201).send(dbMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while fetching messages" });
    });
});
