const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var demo = rewire('./demo');

describe('demo', ()=>{
    context('add', ()=>{
        it('should add two numbers', ()=>{
            expect(demo.add(1,2)).to.equal(3);
        })
    })

    context('callback add', ()=>{
        it('should test the callback', (done)=>{
            demo.addCallback(1,2, (err, result)=>{
                expect(err).to.not.exist;
                expect(result).to.equal(3);
                done();
            })
        })
    })

    context('test promise', ()=>{
        it('should add with a promise cb', (done)=>{
            demo.addPromise(1,2).then((result)=>{
                expect(result).to.equal(3);
                done();
            }).catch((ex)=>{
                console.log('caught error')
                done(ex);
            })
        })

        it('should test a promise with return', ()=>{
            return demo.addPromise(1,2).then((result)=>{
                expect(result).to.equal(3)
            })
        })

        it('should test promise with async await', async ()=>{
            let result = await demo.addPromise(1,2);

            expect(result).to.equal(3);
        })

        it('should test promise with chai as promised', async ()=>{
            await expect(demo.addPromise(1,2)).to.eventually.equal(3);
        });
    })

    context("test demo promise",()=>{
        it("text",(done)=>{
            demo.addPromise(2,5).then((result)=>{
                expect(result).to.equal(7);
                done()
            }).catch((ex)=>{
                done(ex);
            })
        })

        it("aync and await", async()=>{
            // let result = await demo.addPromise(2,5)
            // expect(result).to.equal(7)
            await expect(demo.addPromise(1,2)).to.eventually.equal(3)
        })
    })

    context('test doubles', ()=>{
        it('should spy on log', ()=>{
            let spy = sinon.spy(console, 'log');
            demo.foo();

            expect(spy.calledOnce).to.be.true;
            expect(spy).to.have.been.calledOnce;
            spy.restore();
        })

        it('should stub console.warn', ()=>{
            let stub = sinon.stub(console, 'warn').callsFake(()=>{ console.log('message from stub') });

            demo.foo();
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('console.warn was called');
            stub.restore();
        })
    })

    context('stub private functions', ()=>{
        it('should stub createFile', async ()=>{
            let createStub = sinon.stub(demo, 'createFile').resolves('create_stub');
            let callStub = sinon.stub().resolves('calldb_stub');

            demo.__set__('callDB', callStub);

            let result = await demo.bar('test.txt');

            expect(result).to.equal('calldb_stub');
            expect(createStub).to.have.been.calledOnce;
            expect(createStub).to.have.been.calledWith('test.txt');
            expect(callStub).to.have.been.calledOnce;
        })
    })
})





// MAU2.0/Microsoft AutoUpdate.app/Contents/MacOS/Microsoft Update Assistant.app/Contents/MacOS/Microsoft Update Assistant
