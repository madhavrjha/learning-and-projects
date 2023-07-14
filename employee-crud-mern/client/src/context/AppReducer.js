export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EMPLOYEES':
      return {
        ...state,
        employees: action.payload
      }
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [action.payload, ...state.employees],
      }
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: [action.payload, ...state.employees.filter(emp => emp._id !== action.payload._id)]
      }
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== action.payload)
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'SET_ROLE':
      return {
        ...state,
        form: { ...state.form, role: action.payload }
      }
    case 'SET_FORM_UPDATE_ID':
      return {
        ...state,
        form: { ...state.form, updateId: action.payload }
      }
    default:
      return state;
  }
}
