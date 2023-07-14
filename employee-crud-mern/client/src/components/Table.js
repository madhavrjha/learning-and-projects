import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Table = () => {
  const { employees, deleteEmployee, setRole, setFormUpdateId } = useContext(GlobalContext);

  const handleEdit = (id) => {
    setRole('update');
    setFormUpdateId(id);
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((emp, index) => {
              return (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>
                    <button onClick={() => handleEdit(emp._id)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
          {
            !employees.length && <tr><td colSpan={5}>No employee found</td></tr>
          }
        </tbody>
      </table>
    </div >
  )
}
