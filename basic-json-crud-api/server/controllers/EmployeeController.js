const EmployeeDB = {
  employee: require('../model/employee'),
  setData: function (data) { this.employee = data }
}

const getAllEmployee = async (req, res) => {
  res.json(EmployeeDB.employee)
};

const addNewEmployee = (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) return res.status(400).json({ message: 'firstname and lastname are required' }); // Bad Request
  const foundEmployee = EmployeeDB.employee.find(emp => emp.firstname === firstname && emp.lastname === lastname);
  if (foundEmployee) return res.sendStatus(409); // Conflict

  // TODO:: verify regex only letter and number and space
  EmployeeDB.employee.push({ id: EmployeeDB.employee[EmployeeDB.employee.length - 1]?.id + 1 || 1, firstname, lastname });
  res.json(EmployeeDB.employee);
};

const updateEmployee = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'id is required' });
  const foundEmployee = EmployeeDB.employee.find(emp => emp.id === id);
  if (!foundEmployee) return res.status(404).json({ messgae: 'Employee not found' });

  if (req.body.firstname) foundEmployee.firstname = req.body.firstname;
  if (req.body.lastname) foundEmployee.lastname = req.body.lastname;
  res.json(foundEmployee);
}

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'id is required' });
  const foundEmployee = EmployeeDB.employee.find(emp => emp.id === id);
  if (!foundEmployee) return res.status(404).json({ message: 'Employee not found' });
  const otherEmployees = EmployeeDB.employee.filter(emp => emp.id !== id);
  EmployeeDB.setData(otherEmployees);
  console.log(otherEmployees);
  console.log(EmployeeDB.employee);
  res.json(EmployeeDB.employee);
}


module.exports = { getAllEmployee, addNewEmployee, updateEmployee, deleteEmployee }