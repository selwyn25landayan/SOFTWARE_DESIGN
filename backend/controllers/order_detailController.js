const orderDetail = require('../models/order_detailModel');
const mongoose = require('mongoose');

// GET all Order Details
const getOrderDetails = async (req, res) => {
    try {
        const orderdetail = await orderDetail.find({}).sort({ createdAt: -1 });
        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET a single Order Detail
const getOrderDetail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Detail' });
    }

    try {
        const orderdetail = await orderDetail.findById(id);

        if (!orderdetail) {
            return res.status(404).json({ error: "No such Detail" });
        }

        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// CREATE a new Order Detail
const createOrderDetail = async (req, res) => {
    const { name, address, mobile_number, service_options, weight, laundry_services, payment, delivery_options, total } = req.body;

    // Add to Database
    try {
        const orderdetail = await orderDetail.create({
            name,
            address,
            mobile_number,
            service_options,
            weight,
            laundry_services,
            payment,
            delivery_options,
            total
        });
        res.status(201).json(orderdetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE an Order Detail
const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Detail' });
    }

    try {
        const orderdetail = await orderDetail.findByIdAndDelete(id);

        if (!orderdetail) {
            return res.status(404).json({ error: "No such Detail" });
        }

        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE an Order Detail
const updateOrderDetail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Detail' });
    }

    try {
        const orderdetail = await orderDetail.findByIdAndUpdate(id, req.body, { new: true });

        if (!orderdetail) {
            return res.status(404).json({ error: "No such Detail" });
        }

        res.status(200).json(orderdetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getOrderDetails,
    getOrderDetail,
    createOrderDetail,
    deleteOrderDetail,
    updateOrderDetail
};
