const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var temp = rewire('./temp');

var sandbox = sinon.createSandbox();

exports.login = async (req, res) => {
  const userToLogIn = null; //await User.findOne({ email: req.body.email });

  if (!userToLogIn) {
    return res.status(401).json({ message: 'some fail message' });
  }
}


describe('Login', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: (code) => {
        return {
          json: (response) => {
            return { status: code, response: response };
          }
        }
      }
    }
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should reject unauthorized', async () => {
    let result = await exports.login({}, mockRes)
    console.log('------------result: ', result)
    // check for proper status code and response message here
    expect(result.status).to.equal(401);
    expect(result.response).to.have.property('message').to.equal('some fail message');
  });
});