const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.route('/')
  .get(employeeController.getAllEmployee)
  .post(employeeController.addEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee)

module.exports = router;