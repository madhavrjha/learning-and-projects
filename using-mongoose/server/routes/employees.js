const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.route('/')
  .get(employeeController.getAllEmployee)
  .post(employeeController.addNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.delteEmployee);

module.exports = router;