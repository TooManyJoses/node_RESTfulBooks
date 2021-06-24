const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const Book = require("./models/bookModel");
const bookRouter = require('./routes/bookRouter')(Book);
const port = process.env.PORT || 3000;

const db = mongoose.connect("mongodb://localhost/bookAPI");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("success!");
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
