import { createSlice } from "@reduxjs/toolkit";

const customers = [
  {
    id: 0,
    firstName: "Luca",
    lastName: "Rossi",
    phoneNumber: "331-1444431",

    email: "l.rossi@gmail.com",
    checked: false,
  },
  {
    id: 1,
    firstName: "Andrea",
    lastName: "Neri",
    phoneNumber: "331-1276531",

    email: "a.neri@gmail.com",
    checked: false,
  },
  {
    id: 2,
    firstName: "Simone",
    lastName: "Verdi",
    phoneNumber: "331-1899871",

    email: "s.verdi@gmail.com",
    checked: false,
  },
];

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: customers,
  },
  reducers: {
    saveCustomers: {
      reducer(state, action) {
        state.customers.push(action.payload);
      },
      prepare(value) {
        return {
          payload: {
            id: Date.now(),
            firstName: value.firstName,
            lastName: value.lastName,
            phoneNumber: value.phoneNumber,
            email: value.email,
            checked: false,
          },
        };
      },
    },

    modifyCustomers: {
      reducer(state, action) {
        const { id, firstName, lastName, phoneNumber, email } = action.payload;
        const existingCustomer = state.customers.find(
          (customer) => customer.id === id
        );

        if (existingCustomer) {
          existingCustomer.firstName = firstName;
          existingCustomer.lastName = lastName;
          existingCustomer.phoneNumber = phoneNumber;
          existingCustomer.email = email;
        }
      },
    },

    checkCustomer: {
      reducer(state, action) {
        const checkedCustomers = state.customers.find(
          (customer) => customer.id === action.payload
        );
        if (checkedCustomers) {
          checkedCustomers.checked = !checkedCustomers.checked;
        }
      },
    },

    deleteCustomers: {
      reducer(state) {
        let newList = state.customers.filter((el) => el.checked === false);
        state.customers = newList;
      },
    },
  },
});

export const {
  saveCustomers,
  modifyCustomers,
  deleteCustomers,
  setCustomersToDelete,
  resetCustomersToDelete,
  checkCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
