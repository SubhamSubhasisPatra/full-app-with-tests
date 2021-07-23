const chai = require('chai');
const expect = chai.expect;

var User = require('./user');

describe('User model', ()=>{
    it('should return error is requried ares are missing', (done)=>{
        let user = new User();
        
        user.validate((err)=>{
            expect(err.errors.name).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.age).to.not.exist;

            done();
        })
    })

    it('should have optional age field', (done)=>{
        let user = new User({
            name: 'foo',
            email: 'foo@bar.com',
            age: 35
        })

        expect(user).to.have.property('age').to.equal(35);
        done();
    })
})