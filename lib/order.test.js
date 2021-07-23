const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

var Order = require('./order');
var sandbox = sinon.sandbox.create();

describe('order', ()=>{
    let warnStub, dateSpy, user, items, o;

    beforeEach(()=>{
        warnStub = sandbox.stub(console, 'warn');
        dateSpy = sandbox.spy(Date, 'now');

        user = {id: 1, name: 'foo'};
        items = [
            {name:'Book', price: 10},
            {name:'Dice set', price: 5}
        ]

        o = new Order(123, user, items);
    })

    afterEach(()=>{
        sandbox.restore();
    })

    it('should create instance or Order and calculate total + shipping', ()=>{
        expect(o).to.be.instanceOf(Order);
        expect(dateSpy).to.have.been.calledTwice;
        expect(o).to.have.property('ref').to.equal(123);
        expect(o).to.have.property('user').to.deep.equal(user);
        expect(o).to.have.property('items').to.deep.equal(items);
        expect(o).to.have.property('status').to.equal('Pending');
        expect(o).to.have.property('createdAt').to.be.a('Number');
        expect(o).to.have.property('updatedAt').to.be.a('Number');
        expect(o).to.have.property('subtotal').to.equal(15);
        expect(o).to.have.property('shipping').to.equal(5);
        expect(o).to.have.property('total').to.equal(20);

        expect(o.save).to.be.a('function');
        expect(o.cancel).to.be.a('function');
        expect(o.ship).to.be.a('function');
    })

    it('should update status to active and return order details', ()=>{
        let result = o.save();

        expect(dateSpy).to.have.been.calledThrice;
        expect(o.status).to.equal('Active');
        expect(result).to.be.a('Object');
        expect(result).to.have.property('user').to.equal('foo');
        expect(result).to.have.property('updatedAt').to.be.a('Number');
        //rest of props
    })

    it('should cancel an order, update status and set shipping and total to zero', ()=>{
        let result = o.cancel();

        expect(warnStub).to.have.been.calledWith('Order cancelled');
        expect(dateSpy).to.have.been.calledThrice;
        expect(o.status).to.equal('Cancelled');
        expect(result).to.be.true;
        expect(o.shipping).to.equal(0);
        expect(o.total).to.equal(0);
    })

    it('should update status to shipped', ()=>{
        o.ship();

        expect(o.status).to.equal('Shipped');
        expect(dateSpy).to.have.been.calledThrice;
    })
})