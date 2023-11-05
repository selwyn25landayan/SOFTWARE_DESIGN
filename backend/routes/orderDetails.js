const express = require('express')
const orderDetail = require('../models/order_detailModel')
const {getOrderDetails, getOrderDetail, createOrderDetail, deleteOrderDetail, updateOrderDetail 
} = require('../controllers/order_detailController')
const router = express.Router()

// GET all Order Details
router.get('/', getOrderDetails)

// GET a single Order Detail
router.get('/:id', getOrderDetail)

// POST a new Order Detail
router.post('/', createOrderDetail)

// DELETE an Order Detail
router.delete('/:id', deleteOrderDetail)

// UPDATE an Order Detail
router.patch('/:id', updateOrderDetail)

module.exports = router