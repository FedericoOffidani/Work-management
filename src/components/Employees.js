import { useState } from "react";
import {
  modifyEmployees,
  deleteEmployees,
} from "../features/employee/employeeSlice";
import { useSelector, useDispatch } from "react-redux";

import EmployeesList from "./Employees/EmployeesList";
import Button from "./Button";
import Modal from "./EmployeesServices/Modal/Modal";

export default function Employees() {
  const [show, setShow] = useState(false); /*SHOW OR HIDE THE MODEL*/
  const [text, setText] = useState(false); /*SET THE MODAL TEXT TITLE*/
  const [employeeModify, setEmployeeModify] =
    useState(); /*THE EMPLOYEE'S OBJECT SELECTED FOR MODIFYNG*/
  const [employeesToFilter, setEmployeeToFilter] =
    useState(); /*THE EMPLOYEE'S DATA TO FIND*/
  const [action, setAction] =
    useState(); /*IT SAY TO THE FORM IF WE ARE FILTERING/ADDING/MODIFYNG THE EMPLOYEES*/
  const savedEmployeesList = useSelector((state) => state.employee.employees);

  const dispatch = useDispatch();

  function showModal(modalTitle) {
    setShow(true);
    setText(modalTitle);
  }
  function hideModal() {
    setAction();
    setShow(false);
    setEmployeeModify();
    setAction();
  }

  /*THIS FUNCTION SAVE THE EMPLOYEE TO MODIFY IN A STATE THAT WILL BE PASSED AS A PROPS TO THE FORM*/
  function modifyEmployee() {
    var employeeToModify = [...savedEmployeesList].filter(
      (el) => el.checked === true
    );
    if (employeeToModify.length > 1) {
      hideModal();
      alert("Puoi modificare un solo cliente alla volta");
    } else if (employeeToModify.length === 0) {
      hideModal();
      alert("Selezionare il cliente da modificare");
    } else {
      setEmployeeModify(employeeToModify[0]);
    }
  }

  /*THIS FUNCTION GET THE  EMPLOYEE'S MODIFIED DATAS FROM THE FORM AND REPLACE THE OBSOLETE DATA WITh THEM*/
  function modifyEmployeeList(value, selectedServices, id) {
    let toModify = { ...value, id: id };
    dispatch(modifyEmployees(toModify, selectedServices));
    setEmployeeModify();
  }

  function filterEmployees(value) {
    setEmployeeModify();

    setEmployeeToFilter(value);
    setAction();
  }

  return (
    <>
      <Button
        function={() => {
          showModal("Nuovo cliente");
          setEmployeeToFilter();
        }}
      >
        Aggiungi
      </Button>
      <Button
        function={() => {
          setEmployeeToFilter();
          dispatch(deleteEmployees());
        }}
      >
        Cancella
      </Button>
      <Button
        function={() => {
          showModal("Modifica cliente");
          modifyEmployee();
          setEmployeeToFilter();
        }}
      >
        Modifica
      </Button>
      <Button
        function={() => {
          showModal("Filtra cliente");
          setAction("filtra");
        }}
      >
        Filtra
      </Button>
      <Button
        function={() => {
          setEmployeeToFilter();
        }}
      >
        Reset filtro
      </Button>

      <EmployeesList employeesToFilter={employeesToFilter} />
      <Modal
        hideModal={hideModal}
        show={show}
        text={text}
        employeeModify={employeeModify}
        modifyEmployeeList={modifyEmployeeList}
        filterEmployees={filterEmployees}
        action={action}
      />
    </>
  );
}
