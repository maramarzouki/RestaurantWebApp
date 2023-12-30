const Customer = require('../Controllers/CustomerControllers')
const Router = require('express')
const router = Router();

router.post('/createAccountCustomer',Customer.create_account);
router.post('/loginCustomer', Customer.login_customer);
router.get('/getCustomerInfo/:customerID',Customer.getCustomerInfo);
router.get('/getAllCustomers',Customer.getAllCustomers);
router.put('/updateCustomer/:customerID',Customer.updateCustomer);
router.delete('/deleteCustomer/:customerID',Customer.deleteCustomer);

module.exports = router;