const mongoose = require('mongoose');

const order_schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address:{
        type: String,
    },
    articleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles',
        required: true
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    }
})

const OrderModel = mongoose.model('Orders', order_schema);
module.exports = OrderModel;