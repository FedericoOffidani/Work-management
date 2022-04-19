import { createSlice } from "@reduxjs/toolkit";

const employees = [
  {
    id: 0,
    firstName: "Antonio",
    lastName: "Rossi",
    phoneNumber: "331-1231231",
    services: [
      {
        id: 0,
        name: "Taglio veloce",
        description: "Taglio veloce per capelli corti",
        cost: "10 Euro",
        time: "15 Minuti",
      },
    ],
    email: "a.rossi@gmail.com",
    checked: false,
  },
  {
    id: 1,
    firstName: "Mario",
    lastName: "Neri",
    phoneNumber: "331-1233331",
    services: [
      {
        id: 0,
        name: "Taglio veloce",
        description: "Taglio veloce per capelli corti",
        cost: "10 Euro",
        time: "15 Minuti",
      },
      {
        id: 1,
        name: "Taglio medio",
        description: "Taglio per capelli di media lunghezza",
        cost: "15 Euro",
        time: "30 Minuti",
      },
    ],
    email: "m.neri@gmail.com",
    checked: false,
  },
  {
    id: 2,
    firstName: "Luca",
    lastName: "Verdi",
    phoneNumber: "331-1891231",
    services: [
      {
        id: 2,
        name: "Taglio lungo",
        description: "Taglio per capelli lunghi",
        cost: "20 Euro",
        time: "45 Minuti",
      },
    ],
    email: "l.verdi@gmail.com",
    checked: false,
  },
];

export const employeeSlice = createSlice({
  name: "employee",
  initialState: { employees: employees },
  reducers: {
    saveEmployees: {
      reducer(state, action) {
        state.employees.push(action.payload);
      },
      prepare(value, selectedServices) {
        return {
          payload: {
            id: Date.now(),
            firstName: value.firstName,
            lastName: value.lastName,
            phoneNumber: value.phoneNumber,
            services: selectedServices,
            email: value.email,
            checked: false,
          },
        };
      },
    },
    modifyEmployees: {
      reducer(state, action) {
        const { id, firstName, lastName, phoneNumber, email, services } =
          action.payload;
        const existingEmployee = state.employees.find(
          (employee) => employee.id === id
        );

        if (existingEmployee) {
          existingEmployee.firstName = firstName;
          existingEmployee.lastName = lastName;
          existingEmployee.phoneNumber = phoneNumber;
          existingEmployee.email = email;
          existingEmployee.services = services;
        }
      },
      prepare(action, selectedServices) {
        return {
          payload: {
            id: action.id,
            firstName: action.firstName,
            lastName: action.lastName,
            phoneNumber: action.phoneNumber,
            email: action.email,
            services: selectedServices,
          },
        };
      },
    },

    checkEmployee: {
      reducer(state, action) {
        const checkedEmployees = state.employees.find(
          (employee) => employee.id === action.payload
        );
        if (checkedEmployees) {
          checkedEmployees.checked = !checkedEmployees.checked;
        }
      },
    },

    deleteEmployees: {
      reducer(state) {
        let newList = state.employees.filter((el) => el.checked === false);
        state.employees = newList;
      },
    },
  },
});

export const {
  saveEmployees,
  modifyEmployees,
  deleteEmployees,
  checkEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
