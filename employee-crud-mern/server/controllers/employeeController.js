const Employee = require('../model/Employee');

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees.length) return res.sendStatus(204);
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) return res.status(400).json({ 'message': 'firstname and lastname are required' });
  const { firstname, lastname } = req.body;

  try {
    const employee = await Employee.findOne({ firstname, lastname }).exec();
    if (employee) return res.status(409).json({ 'message': 'Employee already exists' });
    const result = await Employee.create({ firstname, lastname });
    res.status(201).json({ 'id': result._id });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'id is required' });

  try {
    const foundEmployee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!foundEmployee) return res.sendStatus(204);
    if (req.body?.firstname) foundEmployee.firstname = req.body.firstname;
    if (req.body?.lastname) foundEmployee.lastname = req.body.lastname;
    const result = await foundEmployee.save();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'id is required' });

  try {
    const foundEmployee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!foundEmployee) return res.sendStatus(204);
    const result = await foundEmployee.deleteOne();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = {
  getAllEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee
}