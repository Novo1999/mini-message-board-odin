const express = require("express");
const router = require("./routes/messageRoute");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server listening on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
