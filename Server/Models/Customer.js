const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

var validate_email = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const customer_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validate_email, "Invalid Email!"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
})

customer_schema.statics.create_account = async function (firstname, lastname, email, password) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(password)
    const customer = this.create({ firstname, lastname, email, password: hash });
    console.log(customer);
    return customer;
}

customer_schema.statics.login = async function (email, password) {
    const customer = await this.findOne({ email });
    if (!email || !password) {
        throw Error('All fields are required');
    }

    if (!customer) {
        throw Error("Customer doesn't exist!")
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
        throw Error('Password is not correct!')
    }

    return customer;
}

const CustomerModel = mongoose.model('Customers', customer_schema);
module.exports = CustomerModel;