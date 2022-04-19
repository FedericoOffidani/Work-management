import { useState } from "react";
import { modifyCustomers, deleteCustomers } from "./redux/Slice/CustomersSlice";
import { useSelector, useDispatch } from "react-redux";

import CustomersList from "./CustomersList/CustomersList";
import Button from "../Button";
import Modal from "./Modal/Modal";

export default function Customers() {
  const [show, setShow] = useState(false); /*SHOW OR HIDE THE MODEL*/
  const [text, setText] = useState(false); /*SET THE MODAL TEXT TITLE*/
  const [customerModify, setcustomerModify] =
    useState(); /*THE CUSTOMER'S OBJECT SELECTED FOR MODIFYNG*/
  const [customersToFilter, setcustomerToFilter] =
    useState(); /*THE CUSTOMER'S DATA TO FIND*/
  const [action, setAction] =
    useState(); /*IT SAY TO THE FORM IF WE ARE FILTERING/ADDING/MODIFYNG THE CUSTOMERS*/
  const savedCustomersList = useSelector((state) => state.customer.customers);
  const customersTodelete = useSelector(
    (state) => state.customer.customersTodelete
  );
  const dispatch = useDispatch();

  function showModal(modalTitle) {
    setShow(true);
    setText(modalTitle);
  }
  function hideModal() {
    setShow(false);
    setcustomerModify();
    setAction();
  }

  /*THIS FUNCTION SAVE THE CUSTOMER TO MODIFY IN A STATE THAT WILL BE PASSED AS A PROPS TO THE FORM*/
  function modifyCustomer() {
    var customerToModify = [...savedCustomersList].filter(
      (el) => el.checked === true
    );
    if (customerToModify.length > 1) {
      hideModal();
      alert("Puoi modificare un solo cliente alla volta");
    } else if (customerToModify.length === 0) {
      hideModal();
      alert("Selezionare il cliente da modificare");
    } else {
      setcustomerModify(customerToModify[0]);
    }
  }

  /*THIS FUNCTION GET THE  CUSTOMER'S MODIFIED DATAS FROM THE FORM AND REPLACE THE OBSOLETE DATA WITh THEM*/
  function modifyCustomerList(value, id) {
    let toModify = { ...value, id: id };
    dispatch(modifyCustomers(toModify));
    setcustomerModify();
  }

  function filterCustomers(value) {
    setcustomerModify();
    setcustomerToFilter(value);
    setAction();
  }

  return (
    <>
      <Button
        function={() => {
          showModal("Nuovo cliente");
          setcustomerToFilter();
        }}
      >
        Aggiungi
      </Button>
      <Button
        function={() => {
          setcustomerToFilter();
          dispatch(deleteCustomers());
        }}
      >
        Cancella
      </Button>
      <Button
        function={() => {
          showModal("Modifica cliente");
          modifyCustomer();
          setcustomerToFilter();
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
          setcustomerToFilter();
        }}
      >
        Reset filtro
      </Button>

      <CustomersList customersToFilter={customersToFilter}></CustomersList>
      <Modal
        hideModal={hideModal}
        show={show}
        text={text}
        // saveNewCustomer={saveNewCustomer}
        customerModify={customerModify}
        modifyCustomerList={modifyCustomerList}
        filterCustomers={filterCustomers}
        action={action}
      ></Modal>
    </>
  );
}
