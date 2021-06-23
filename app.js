const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");

bookRouter.route("/books").get((req, res) => {
  Book.find((err, books) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(books);
    }
  });
});

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("success!");
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
