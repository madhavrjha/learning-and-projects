const express = require('express');
const { createNewUser, updateUser, getAllUsers, deleteUser } = require('../controllers/userController');

const router = express.Router();
router.route('/')
  .get(getAllUsers)
  .post(createNewUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;