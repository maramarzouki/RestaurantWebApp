const Customer = require('../Models/Customer')
const jwt = require('jsonwebtoken');
const prv_key = "azertyuiop"
const bcrypt = require('bcrypt');

const create_token = (_id) => {
    return jwt.sign({ _id }, prv_key)
}

exports.create_account = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newCustomer = await Customer.create_account(firstname, lastname, email, password);
        const token = create_token(newCustomer._id);
        res.status(201).send({ Token: token, NewCustomer: newCustomer });
    } catch (err) {
        res.status(500).send({ ERROR: err.message });
    }
}

exports.login_customer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.login(email, password);
        const token = create_token(customer._id);
        res.status(200).send({ 'Token': token });
    } catch (err) {
        res.status(500).send({ ERROR: err.message });
    }
}

exports.getCustomerInfo = async (req, res) => {
    try {
        const customer = await Customer.findById({ _id: req.params.customerID });
        if (customer) {
            res.status(200).send({ Customer: customer })
        } else {
            res.status(404).send("Customer not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.getAllCustomers = async (req, res) => {
    try {
        const customersList = await Customer.find({});
        if (customersList) {
            res.status(200).send(customersList)
        } else {
            res.status(404).send("Customers list is still empty!")
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.updateCustomer = async (req, res) => {
    const updates = req.body;
    try {
        const customer = await Customer.findById({ _id: req.params.customerID })
        if (customer) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                await Customer.updateOne({ _id: req.params.customerID }, { $set: updates })
                    .then(result => {
                        res.status(200).send(result)
                    }).catch(err => {
                        res.status(400).send(err)
                    })
            } else {
                await Customer.updateOne({ _id: req.params.customerID }, { $set: updates }).
                    then(result => {
                        res.status(200).send(result)
                    }).catch(err => {
                        res.status(400).send(err)
                    })
            }
        } else {
            res.status(404).send("Customer not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete({ _id: req.params.customerID });
        if (result) {
            res.status(200).send("Customer account deleted!");
        } else {
            res.status(404).send("Customer not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}
