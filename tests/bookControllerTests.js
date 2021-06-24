const should = require('should');
const sinon = require('sinon');
const booksController = require('../routes/controllers/booksController');

describe('Book Controllers', () => {
  describe('Post test', () => {
    it('should not allow an empty title on POST', () => {
      const Book = function(book) {this.save = () => {}}

      const req = {
        body: {
          author: 'agatha'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = booksController(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
