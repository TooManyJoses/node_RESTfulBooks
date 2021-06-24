const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

const db = mongoose.connect("mongodb://localhost/bookAPI");
const Book = require("./models/bookModel");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route("/books")
  .get((req, res) => {
    const query = {};
    if(req.query.genre){
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(books);
      }
    });
})
.post((req, res) => {
  const book = new Book(req.body);

  book.save();
  return res.status(201).json(book);
});

bookRouter.route("/books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(book);
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
