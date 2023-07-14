import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Form = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const firstNameInputRef = useRef(null);

  const { addEmployee, updateEmployee, setMessage, setRole, setFormUpdateId, form, employees } = useContext(GlobalContext);
  const { role, updateId } = form;

  useEffect(() => {
    if (!updateId) return;

    const editableEmployee = employees.find(emp => emp._id === updateId)
    setFirstname(editableEmployee.firstname);
    setLastname(editableEmployee.lastname);
  }, [updateId, employees]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!firstname.trim() || !lastname.trim()) {
      setMessage({ text: 'Firstname and Lastname can not be empty', type: 'error' })
      return;
    }

    if (role === 'add') {
      const newEmployee = { firstname, lastname }
      addEmployee(newEmployee);
    } else if (role === 'update') {
      const editableEmployee = { firstname, lastname }
      updateEmployee(editableEmployee);
      setRole('add');
      setFormUpdateId(null);
    }

    setFirstname('');
    setLastname('');

    firstNameInputRef.current.focus();
  }

  return (
    <div className="form-wrapper" onSubmit={handleSubmit}>
      <form>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" name="firstname" id="firstname" value={firstname} ref={firstNameInputRef} onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" name="lastname" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <button type="submit">{role === 'add' ? 'Add' : 'Update'} Employee</button>
        </div>
      </form>
    </div>
  )
}
