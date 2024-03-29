const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var validate_email = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const admin_schema = new mongoose.Schema({
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
    },
    phoneNumber: {
        type: Number,
        required: true
    }
})

admin_schema.statics.create_account = async function (firstname, lastname, email, password, phoneNumber) {
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(password)
    const admin = this.create({ firstname, lastname, email, password: hash, phoneNumber });
    console.log(admin);
    return admin;
}

admin_schema.statics.login = async function (email, password) {
    const admin = await this.findOne({ email });
    if (!email || !password) {
        throw Error('All fields are required');
    }

    if (!admin) {
        throw Error("Admin doesn't exist!")
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
        throw Error('Password is not correct!')
    }

    return admin;
}

const AdminModel = mongoose.model('Admins', admin_schema);
module.exports = AdminModel;