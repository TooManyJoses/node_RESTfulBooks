require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'TEST';

const app = require('../app');
const Book = mongoose.model('Book');

const agent = request.agent(app);

describe('Book CRUD Tests', () => {
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  it('should allowed a book to be posted and return read and _id', (done) => {
    const testBook = { title: 'Test Title', author: 'Test Author', genre: 'Test Genre'};

    agent.post('/api/books')
    .send(testBook)
    .expect(201)
    .end((err, results) =>{
      console.log(results)
      results.body.read.should.equal(false);
      results.body.should.have.property('_id');
      done();
    });
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  })

})
