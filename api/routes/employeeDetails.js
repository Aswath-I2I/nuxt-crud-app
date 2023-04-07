const express = require('express')
const EmployeeDetailsController = require('../controllers/employeeDetails')
const router = express.Router();

router.get('/', EmployeeDetailsController.fetchAll);
router.post('/', EmployeeDetailsController.create);
router.patch('/:id', EmployeeDetailsController.update);
router.delete('/:id', EmployeeDetailsController.delete);

module.exports = router