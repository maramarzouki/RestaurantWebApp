const Admin = require('../Models/Admin')
const jwt = require('jsonwebtoken');
const prv_key = "azertyuiop"
const bcrypt = require('bcrypt');

const create_token = (_id) => {
    return jwt.sign({ _id }, prv_key)
}

exports.addAdmin = async (req, res) => {
    const { firstname, lastname, email, password, phoneNumber } = req.body;

    try {
        const newAdmin = await Admin.create_account(firstname, lastname, email, password, phoneNumber);
        const token = create_token(newAdmin._id);
        res.status(201).send({ Token: token, NewAdmin: newAdmin });
    } catch (err) {
        res.status(500).send({ ERROR: err.message });
        console.log({ ERROR: err.message });
    }
}

exports.login_admin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.login(email, password);
        const token = create_token(admin._id);
        res.status(200).send({ 'Token': token });
        console.log({Token: token});
    } catch (err) {
        res.status(500).send({ ERROR: err.message });
    }
}

exports.get_admin_info = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.params.adminID });
        if (admin) {
            res.status(200).send(admin)
        } else {
            res.status(404).send("Admin not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.get_all_admins = async (req, res) => {
    try {
        const admin = await Admin.find({});
        if (admin) {
            res.status(200).send(admin)
        } else {
            res.status(204).send("Admin not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message });
    }
}

exports.update_admin = async (req, res) => {
    const updates = req.body;
    try {
        const admin = await Admin.findById({ _id: req.params.adminID })
        if (admin) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
                await Admin.updateOne({ _id: req.params.adminID }, { $set: updates })
                    .then(result => {
                        res.status(200).send(result)
                    }).catch(err => {
                        res.status(400).send(err)
                    })
            } else {
                await Admin.updateOne({ _id: req.params.adminID }, { $set: updates }).
                    then(result => {
                        res.status(200).send(result)
                    }).catch(err => {
                        res.status(400).send(err)
                    })
            }
        } else {
            res.status(404).send("Admin not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}

exports.delete_admin = async (req, res) => {
    try {
        const result = await Admin.findByIdAndDelete({_id: req.params.adminID})
        // res.send(result);
        if(result){
            res.status(200).send("Admin account deleted!");
        }else{
            res.status(404).send("Admin not found!");
        }
    } catch (error) {
        res.status(500).send({ ERROR: error.message })
    }
}