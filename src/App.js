import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Customers from './components/Customers/Customers';
import Services from './components/Services/Services'
import './App.css';
import Employees from "./components/Employees";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useLocation, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import RequireAuth from "./features/auth/RequireAuth";
// import Calendar from './components/Scheduler/Calendar'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import "./App.css";
import SchedulerApp from "./components/Scheduler/Calendar"

function App() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const { state } = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* ROTTA LOGIN */}
          <Route
            path="login"
            element={
              auth ? <Navigate to={state?.path || "dashboard"} /> : <Login />
            }
          />
          {/* ROTTA DASHBOARD */}
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {/* ROTTA EMPLOYEES  */}
          <Route
            path="employees"
            element={
              // <RequireAuth>
              <Employees />
              // </RequireAuth>
            }
          />
          <Route
            path="customers"
            element={
              // <RequireAuth>
              <Customers />
              // </RequireAuth>
            }
          />

          <Route
            path="services"
            element={
              // <RequireAuth>
              <Services />
              // </RequireAuth>
            }
          />

          {/* <Route
            path="scheduler"
            element={
              // <RequireAuth>
              <Calendar />}/> */}
             
              <Route
              path="scheduler"
              element={
                <SchedulerApp/>}
            />

          {/* ROTTE NON ESISTENTI */}
          <Route
            path="*"
            element={<Navigate to={auth ? "dashboard" : "login"} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
