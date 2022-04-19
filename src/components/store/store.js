import { configureStore } from "@reduxjs/toolkit";
import customerReducers from "../Customers/redux/Slice/CustomersSlice";
import servicesSlice from "../Services/redux/ServicesSlice/ServicesSlice";
import authReducer from "../../features/auth/authSlice";
import employeeSlice from "../../features/employee/employeeSlice";


export default configureStore({
  reducer: {
    customer: customerReducers,
    service: servicesSlice,
    auth: authReducer,
    employee: employeeSlice,
  },
});
