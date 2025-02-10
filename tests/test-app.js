const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../index.js');

const apiKey = process.env.API_KEY;

describe('GET /', () => {
  it('should respond with hello world', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('text/plain');
        done();
      });
  });

  it('should have valid API key', () => {
    should.exist(apiKey, 'API_KEY environment variable must be set');
    apiKey.should.be.a('string');
    apiKey.length.should.be.at.least(10);
  });
});
