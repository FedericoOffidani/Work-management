import { Formik, Form, useField } from "formik";
import "./Servicesformik.css";
import Button from "../../Button";
import * as Yup from "yup";
import { saveServices } from "../redux/ServicesSlice/ServicesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";

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

function CostInput(props) {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor="">
        <input type="number" {...field} {...props}></input>
        {props.label}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
}

function DurationInput(props) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor="">
        <input type="number" {...field} {...props}></input>
        {props.label}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
}

function SelectTimeFormat(props) {
  const [meta] = useField(props);
  return (
    <>
      <select
        value={props.selectedOption}
        id="selectTimeFormat"
        name="selectTimeFormat"
        onChange={props.onChange}
      >
        <option>{props.option1}</option>
        <option>{props.option2}</option>
      </select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
}

export default function ServiceForm(props) {
  const [selectedOption, setSelectedOption] = useState(" Minuti");
  let serviceToModifyObject = props.serviceModify;
  const savedServicesList = useSelector((state) => state.service.services);
  const dispatch = useDispatch();

  function selectChanged(e) {
    setSelectedOption(e.target.options[e.target.selectedIndex].text);
  }

  return (
    <>
      <h1>{props.children}</h1>
      <Formik
        initialValues={{
          name: serviceToModifyObject ? serviceToModifyObject.name : "",
          description: serviceToModifyObject
            ? serviceToModifyObject.description
            : "",
          cost: serviceToModifyObject
            ? parseInt(serviceToModifyObject.cost.match(/(\d+)/))
            : "",
          selectTimeFormat: serviceToModifyObject
            ? serviceToModifyObject.cost
            : "",
          time: serviceToModifyObject
            ? parseInt(serviceToModifyObject.time.match(/(\d+)/))
            : "",
        }}
        validationSchema={
          /*VALIDATION SCHEMA TO ADD A NEW CUSTOMER*/
          !props.action
            ? Yup.object({
                name: Yup.string().required("Campo obbligatorio"),
                description: Yup.string().required("Campo obbligatorio"),
                time: Yup.string().required("Campo obbligatorio"),
                cost: Yup.string().required("Campo obbligatorio"),
              })
            : /*NONE VALIDATION SCHEMA WHEN FILTERING THE CUSTOMERS*/
              null
        }
        onSubmit={(value) => {
          /*SENDING DATA TO ADD A NEW CUSTOMER*/
          if (!props.action) {
            /* "ACTION" SAY IF WE ARE ADDING/MODIFYNG A CUSTOMER OF IF WE ARE FILTERING THE CUSTOMER'S LIST*/
            if (!serviceToModifyObject) {
              dispatch(saveServices(value, selectedOption));
              // props.saveFormData(value);
              setTimeout(() => {
                props.hideModal();
              }, 200);
            } else {
              /*SENDING DATA TO MODIFY AN EXISTING CUSTOMER*/
              props.modifyServiceList(
                value,
                selectedOption,
                serviceToModifyObject.id
              );
              setTimeout(() => {
                props.hideModal();
              }, 200);
            }
          } else {
            /*SENDING DATA TO FILTER THE CUSTOMER'S LIST*/
            value.time=value.time+selectedOption
            props.filterServices(value);
            setTimeout(() => {
              props.hideModal();
            }, 200);
          }
        }}
      >
        <Form className="form">
          <TextInput
            label="Nome"
            id="name"
            name="name"
            placeholder="Inserisci il nome del servizio"
          />
          <TextInput
            label="Descrizione"
            id="description"
            name="description"
            placeholder="Inserisci la descrizione del servizio"
          />
          <CostInput
            label="Costo del servizio in €"
            id="cost"
            name="cost"
            placeholder="Inserisci il costo del servizio"
          />

          <DurationInput
            label="Durata del servizio"
            id="time"
            name="time"
            placeholder="Inserisci la durata del servizio specificando se in ore o minuti"
            option1="Minuti"
            option2="Ore"
          />
          <SelectTimeFormat
            id="selectTimeFormat"
            name="selectTimeFormat"
            onChange={(e) => {
              selectChanged(e);
            }}
            option1="Minuti"
            option2="Ore"
            selectedOption={selectedOption}
          />
          <Button type={"submit"} function={() => null}>
            Conferma
          </Button>
        </Form>
      </Formik>
    </>
  );
}
