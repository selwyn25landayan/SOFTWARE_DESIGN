const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const orderDetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    mobile_number: {
        type: String,
        required: true
    },

    service_options: {
        type: String,
        required: false
    },

    weight: {
        type: Number,
        required: false
    },

    laundry_services: {
        type: [String],
        required: false
    },

    payment: {
        type: String,
        required: false
    },
    
    delivery_options: {
        type: String,
        required: false
    },

    total: {
        type: Number,
    },

}, {timestamps: true})

const OrderDetailModel = mongoose.model('OrderDetail', orderDetailsSchema);

module.exports = OrderDetailModel;

OrderDetailModel.find()