const Admin = require('../Controllers/AdminControllers')
const Router = require('express');

const router = Router();

router.post('/addAdmin', Admin.addAdmin);
router.post('/loginAdmin', Admin.login_admin);
router.get('/getAdminDetails/:adminID', Admin.get_admin_info);
router.put('/updateAdmin/:adminID', Admin.update_admin);
router.delete('/deleteAdmin/:adminID', Admin.delete_admin);

module.exports = router;