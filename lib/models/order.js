var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    item: String,
    total: Number,
    notes: String
}, {
    collection: 'orders'
}); //overrides default collection name auto created

module.exports = mongoose.model('Order', OrderSchema);