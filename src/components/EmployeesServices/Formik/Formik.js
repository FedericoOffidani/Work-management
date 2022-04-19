import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { saveEmployees } from "../../../features/employee/employeeSlice";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import Button from "../../Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./formik.css";

function TextInput(props) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor="">
        <input type="text" {...field} {...props}></input>
        {props.label}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
}

function PhoneInput(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>
        <small>Formato: 123-456-7890</small>
        <input type="tel" {...field} {...props} />
        {props.label}{" "}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function EmailInput(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>
        <input type="email" {...field} {...props} />
        {props.label}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function ServicesInput(props) {
  const [field, meta] = useField(props);
  const servicesList = useSelector((state) => state.service.services);

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <ListGroup as="ul" className="mb-3">
        {servicesList.map((el, i) => {
          props.checkcheckedservices(el);
          return (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-center"
              key={i}
              value={el}
            >
              <div>
                <div className="fw-bold">{el.name}</div>
                <div className="d-flex justify-content-between">
                  <div>Tempo: {el.time}</div>
                  <div>Costo: {el.cost}</div>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked={props.found.current ? true : false}
                onClick={(e) => {
                  props.onClick(el, e);
                }}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default function EmployeeForm(props) {
  let employeeToModifyObject = props.employeeModify;
  const found = useRef(null);
  const selectedServiceRef = useRef([]);
  const dispatch = useDispatch();

  const [selectedServices, setSelectedServices] = useState([]);

  function checkedServices(el, e) {
    if (e.target.checked && !selectedServices.includes(el)) {
      return setSelectedServices([...selectedServices, el]);
    }
    return setSelectedServices(
      selectedServices.filter((obj) => {
        return obj.id !== el.id;
      })
    );
  }

  // ----------------------------------------------------------------
  function checkCheckedServices(el) {
    if (
      employeeToModifyObject !== undefined &&
      employeeToModifyObject.services
    ) {
      found.current = employeeToModifyObject.services.find(
        (elm) => elm.name === el.name
      );
      if (
        found.current !== undefined &&
        found.current !== null &&
        !selectedServiceRef.current.includes(found.current)
      ) {
        selectedServiceRef.current = [
          ...selectedServiceRef.current,
          found.current,
        ];
      }
    }
  }
  // ----------------------------------------------------------------

  useEffect(() => {
    setSelectedServices([...selectedServiceRef.current]);
  }, []);

  return (
    <>
      <h1>{props.children}</h1>
      <Formik
        initialValues={{
          firstName: employeeToModifyObject
            ? employeeToModifyObject.firstName
            : "",
          lastName: employeeToModifyObject
            ? employeeToModifyObject.lastName
            : "",
          phoneNumber: employeeToModifyObject
            ? employeeToModifyObject.phoneNumber
            : "",
          email: employeeToModifyObject ? employeeToModifyObject.email : "",
          services: employeeToModifyObject
            ? employeeToModifyObject.services
            : [],
        }}
        validationSchema={
          /*VALIDATION SCHEMA TO ADD A NEW EMPLOYEE*/
          !props.action
            ? Yup.object({
                firstName: Yup.string().required("Campo obbligatorio"),
                lastName: Yup.string().required("Campo obbligatorio"),
                phoneNumber: Yup.string().required("Campo obbligatorio"),
                email: Yup.string().required("Campo obbligatorio"),
                // services: Yup.string().required("Campo obbligatorio"),
              })
            : /*NONE VALIDATION SCHEMA WHEN FILTERING THE EMPLOYEES*/
              null
        }
        onSubmit={(value) => {
          /*SENDING DATA TO ADD A NEW EMPLOYEE*/
          if (!props.action) {
            /* "ACTION" SAY IF WE ARE ADDING/MODIFYNG A EMPLOYEE OF IF WE ARE FILTERING THE EMPLOYEE'S LIST*/
            if (!employeeToModifyObject) {
              dispatch(saveEmployees(value, selectedServices));
              // props.saveFormData(value);
              setTimeout(() => {
                props.hideModal();
              }, 200);
            } else {
              /*SENDING DATA TO MODIFY AN EXISTING EMPLOYEE*/
              props.modifyEmployeeList(
                value,
                selectedServices,
                employeeToModifyObject.id
              );
              setTimeout(() => {
                props.hideModal();
              }, 200);
            }
          } else {
            /*SENDING DATA TO FILTER THE EMPLOYEE'S LIST*/
            value.services.push([...selectedServices]);
            props.filterEmployees(value);
            setTimeout(() => {
              props.hideModal();
            }, 200);
          }
        }}
      >
        <Form className="form">
          <TextInput
            id="firstName"
            name="firstName"
            label="Nome"
            placeholder="Inserisci il nome dell'impiegato"
          />
          <TextInput
            id="lastName"
            name="lastName"
            label="Cognome"
            placeholder="Inserisci il cognome dell'impiegato"
          />
          <PhoneInput
            id="phoneNumber"
            name="phoneNumber"
            label="Recapito telefonico"
            placeholder="Recapito telefonico dell'impiegato"
          />
          <EmailInput
            id="email"
            name="email"
            label="Email"
            placeholder="Email dell'impiegato"
          />
          <ServicesInput
            id="services"
            name="services"
            label="Services"
            placeholder="Services dell'impiegato"
            found={found}
            checkcheckedservices={(el) => {
              checkCheckedServices(el);
            }}
            onClick={(el, e) => {
              checkedServices(el, e);
            }}
          />
          <Button type={"submit"} function={() => null}>
            Conferma
          </Button>
        </Form>
      </Formik>
    </>
  );
}
