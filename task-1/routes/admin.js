const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add => GET
router.get('/add-employee', isAuth, adminController.getAddEmployee);
router.get('/add-department', isAuth, adminController.getAddDepartment);

// /admin/Findall => GET
router.get('/employees', isAuth, adminController.getEmployees);
router.get('/departments', isAuth, adminController.getDepartments);

// /admin/add => POST
router.post('/add-employee', isAuth, adminController.postAddEmployee);
router.post('/add-department', isAuth, adminController.postAddDepartment);

// /admin/edit => GET
router.get('/edit-employee/:employeeId', isAuth, adminController.getEditEmployee);
router.get('/edit-department/:departmentId', isAuth, adminController.getEditDepartment);

// /admin/edit => POST
router.post('/edit-employee', isAuth, adminController.postEditEmployee);
router.post('/edit-department', isAuth, adminController.postEditDepartment);

// /admin/delete => POST
router.post('/delete-employee', isAuth, adminController.postDeleteEmployee);
router.post('/delete-department', isAuth, adminController.postDeleteDepartment);

module.exports = router;
