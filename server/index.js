import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Cors from "cors";
import Pusher from "pusher";
dotenv.config();

import Messages from "./Schema/dbMessages.js";

//App config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_CONNECTION_URL;

const pusher = new Pusher({
  appId: "1810813",
  key: "8942ae445a3177a54ae6",
  secret: "4b12ce02ed029e2f9aca",
  cluster: "ap2",
  useTLS: true,
});

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
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage)
    .then((dbMessage) => res.status(201).send("Data Sent"))
    .catch((err) => {
      // console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while saving message" });
    });
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
