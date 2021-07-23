const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var sandbox = sinon.sandbox.create();
var mailer = rewire('./mailer');

describe('mailer', ()=>{
    let emailStub;

    beforeEach(()=>{
        emailStub = sandbox.stub().resolves('done');
        mailer.__set__('sendEmail', emailStub);
    })

    afterEach(()=>{
        sandbox.restore();
        mailer = rewire('./mailer');
    })

    context('sendWelcomeEmail', ()=>{
        it('should check for email and name', async()=>{
            await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith('Invalid input');
            await expect(mailer.sendWelcomeEmail('foo@bar.com')).to.eventually.be.rejectedWith('Invalid input');
        })

        it('should call sendEmail with email and message', async()=>{
            await mailer.sendWelcomeEmail('foo@bar.com', 'foo');
            expect(emailStub).to.have.been.calledWith('foo@bar.com', 'Dear foo, welcome to our family!');
        })
    })

    context('sendPasswordResetEmail', ()=>{
        it('should check for email', async()=>{
            await expect(mailer.sendPasswordResetEmail()).to.eventually.be.rejectedWith('Invalid input');
        })

        it('should call sendEmail with email and message', async()=>{
            await mailer.sendPasswordResetEmail('foo@bar.com');
            expect(emailStub).to.have.been.calledWith('foo@bar.com', 'Please click http://some_link to reset your password.');
        })
    })

    context('sendEmail', ()=>{
        let sendEmail;

        beforeEach(()=>{
            mailer = rewire('./mailer');
            sendEmail = mailer.__get__('sendEmail');
        })

        it('should check for email and body', async()=>{
            await expect(sendEmail()).to.eventually.be.rejectedWith('Invalid input');
            await expect(sendEmail('foo@bar.com')).to.eventually.be.rejectedWith('Invalid input');
        })

        it('should call sendEmail with email and message', async()=>{
            //stub actual mailer
            let stub = sandbox.stub(console, 'log').resolves('done');
            let result = await(sendEmail('foo@bar.com', 'welcome'));

            expect(result).to.equal('Email sent');
        })
    })
})