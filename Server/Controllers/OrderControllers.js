const Order = require('../Models/Order')

exports.createOrder = async (req, res) => {
    const { articleID, quantity, customerID } = req.body;

    try {
        await Order.create({ articleID, quantity, customerID })
            .then((response) => {
                res.send(response);
            })

    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById({ _id: req.params.orderID });
        if (order) {
            res.status(200).send({ Order: order });
        } else {
            res.status(404).send({ ERR: "Order not found!" })
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customerID: req.params.customerID });
        if (orders.length>0) {
            res.status(200).send({ Orders: orders })
        } else {
            res.status(204).send("No order found!")
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.updateOrder = async (req, res) => {
    const updates = req.body;
    try {
        const order = await Order.findById({ _id: req.params.orderID })
        if (order) {
            await order.updateOne(updates)
                .then(() => res.status(200).send("Order updated successfully"))
                .catch(error => res.status(400).send({ ERR: error.message }));
        } else {
            res.status(404).send({ ERROR: "Order not found!" })
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const result = await Order.findByIdAndDelete({ _id: req.params.orderID })
        if (result) {
            res.status(200).send("Order deleted!");
        } else {
            res.status(404).send("Order not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}