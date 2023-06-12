const express = require('express');
const { getAllEmployee, addNewEmployee, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router();

router.route('/')
  .get(getAllEmployee)
  .post(addNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);


module.exports = router;