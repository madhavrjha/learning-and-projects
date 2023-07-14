import React, { useEffect, useReducer } from "react";
import { AppReducer } from './AppReducer';

// Initial State
const initialState = {
  employees: [],
  message: { text: '', type: '' },
  form: { role: 'add', updateId: null }
};

// Global Context
export const GlobalContext = React.createContext(initialState);

// Global Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    fetch('http://localhost:3500/employee')
      .then(res => res.json())
      .then(data => dispatch({ type: 'LOAD_EMPLOYEES', payload: data }))
      .catch(err => dispatch({ type: 'LOAD_EMPLOYEES', payload: [] }))
  }, []);

  // Functions

  const addEmployee = async (employee) => {
    try {
      const response = await fetch('http://localhost:3500/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
      if (response.ok) {
        const data = await response.json();
        employee._id = data.id;
        dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
        setMessage({ text: 'New employeee added Successfully', type: 'success' });
      } else {
        switch (response.status) {
          case 400:
            setMessage({ text: await response.json().message, type: 'error' });
            break;
          case 409:
            setMessage({ text: 'This employee already exists', type: 'error' });
            break;
          default:
            return;
        }
      }
    } catch (e) {
      setMessage({ text: 'Something went wrong please try after sometimes.', type: 'error' });
    }
  }

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch('http://localhost:3500/employee', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
        setMessage({ text: 'Employee deleted successfully', type: 'success' });
      }
    } catch (e) {
      setMessage({ text: 'Something went wrong please try after sometimes.', type: 'error' });
    }
  }

  const updateEmployee = async ({ firstname, lastname }) => {
    try {
      const response = await fetch('http://localhost:3500/employee', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: state.form.updateId, firstname, lastname })
      });
      if (response.ok) {
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: await response.json() });
        setMessage({ text: 'Employee updated successfully', type: 'success' });
      }
    } catch (e) {
      setMessage({ text: 'Something went wrong please try after sometimes.', type: 'error' });
    }
  }

  const setMessage = ({ text, type }) => {
    dispatch({ type: 'SET_MESSAGE', payload: { text, type } });
    setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', payload: { text: '', type: '' } });
    }, 3000);
  }

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  }

  const setFormUpdateId = (id) => {
    dispatch({ type: 'SET_FORM_UPDATE_ID', payload: id });
  }

  return (
    <GlobalContext.Provider value={{
      employees: state.employees,
      message: state.message,
      form: state.form,
      addEmployee,
      deleteEmployee,
      updateEmployee,
      setMessage,
      setRole,
      setFormUpdateId
    }}>
      {children}
    </GlobalContext.Provider>
  )
}