const mongoose = require('mongoose');

const order_schema = new mongoose.Schema({
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    timeOfOrder:{
        type: Date,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    }
})

const OrderModel = mongoose.model('Orders', order_schema);
module.exports = OrderModel;