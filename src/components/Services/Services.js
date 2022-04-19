import ServicesList from "./ServicesList/ServicesList";
import Button from "../Button";
import ServicesModal from "./ServicesModal/ServicesModal";
import { useState } from "react";
import {
  modifyServices,
  deleteServices,
} from "./redux/ServicesSlice/ServicesSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Services2() {
  const [show, setShow] = useState(false); /*SHOW OR HIDE THE MODEL*/
  const [text, setText] = useState(false); /*SET THE MODAL TEXT TITLE*/
  const [serviceModify, setserviceModify] =
    useState(); /*THE CUSTOMER'S OBJECT SELECTED FOR MODIFYNG*/
  const [servicesToFilter, setserviceToFilter] =
    useState(); /*THE CUSTOMER'S DATA TO FIND*/
  const [action, setAction] =
    useState(); /*IT SAY TO THE FORM IF WE ARE FILTERING/ADDING/MODIFYNG THE CUSTOMERS*/
  const savedServicesList = useSelector((state) => state.service.services);
  // const servicesTodelete = useSelector((state) => state.service.servicesTodelete);
  const dispatch = useDispatch();

  function showModal(modalTitle) {
    setShow(true);
    setText(modalTitle);
  }
  function hideModal() {
    setShow(false);
    setserviceModify();
    setAction();
  }

  /*THIS FUNCTION SAVE THE CUSTOMER TO MODIFY IN A STATE THAT WILL BE PASSED AS A PROPS TO THE FORM*/
  function modifyService() {
    var serviceToModify = [...savedServicesList].filter(
      (el) => el.checked === true
    );
    if (serviceToModify.length > 1) {
      hideModal();
      alert("Puoi modificare un solo cliente alla volta");
    } else if (serviceToModify.length === 0) {
      hideModal();
      alert("Selezionare il cliente da modificare");
    } else {
      setserviceModify(serviceToModify[0]);
    }
  }

  /*THIS FUNCTION GET THE  CUSTOMER'S MODIFIED DATAS FROM THE FORM AND REPLACE THE OBSOLETE DATA WITh THEM*/
  function modifyServiceList(value, selectedOption, id) {
    let toModify = { ...value, id: id };
    dispatch(modifyServices(toModify, selectedOption));

    setserviceModify();
  }

  function filterServices(value) {
    setserviceModify();
    setserviceToFilter(value);
    setAction();
  }

  return (
    <>
      <Button
        function={() => {
          showModal("Nuovo servizio");
          setserviceToFilter();
        }}
      >
        Aggiungi
      </Button>
      <Button
        function={() => {
          setserviceToFilter();
          dispatch(deleteServices());
        }}
      >
        Cancella
      </Button>
      <Button
        function={() => {
          showModal("Modifica servizio");
          modifyService();
          setserviceToFilter();
        }}
      >
        Modifica
      </Button>
      <Button
        function={() => {
          showModal("Filtra servizio");
          setAction("filtra");
        }}
      >
        Filtra
      </Button>
      <Button
        function={() => {
          setserviceToFilter();
        }}
      >
        Reset filtro
      </Button>

      <ServicesList servicesToFilter={servicesToFilter}></ServicesList>
      <ServicesModal
        hideModal={hideModal}
        show={show}
        text={text}
        // saveNewService={saveNewService}
        serviceModify={serviceModify}
        modifyServiceList={modifyServiceList}
        filterServices={filterServices}
        action={action}
      ></ServicesModal>
    </>
  );
}
