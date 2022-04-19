import { Formik, Form, useField } from "formik";
import "./formik.css";
import Button from "../../Button";
import * as Yup from "yup";
import { saveCustomers } from "../redux/Slice/CustomersSlice";
import { useSelector, useDispatch } from "react-redux";
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

export default function CustomerForm(props) {
  let customerToModifyObject = props.customerModify;
  const savedCustomersList = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();

  return (
    <>
      <h1>{props.children}</h1>
      <Formik
        initialValues={{
          firstName: customerToModifyObject
            ? customerToModifyObject.firstName
            : "",
          lastName: customerToModifyObject
            ? customerToModifyObject.lastName
            : "",
          phoneNumber: customerToModifyObject
            ? customerToModifyObject.phoneNumber
            : "",
          email: customerToModifyObject ? customerToModifyObject.email : "",
        }}
        validationSchema={
          /*VALIDATION SCHEMA TO ADD A NEW CUSTOMER*/
          !props.action
            ? Yup.object({
                firstName: Yup.string().required("Campo obbligatorio"),
                lastName: Yup.string().required("Campo obbligatorio"),
                phoneNumber: Yup.string().required("Campo obbligatorio"),
              })
            : /*NONE VALIDATION SCHEMA WHEN FILTERING THE CUSTOMERS*/
              null
        }
        onSubmit={(value) => {
          /*SENDING DATA TO ADD A NEW CUSTOMER*/
          if (!props.action) {
            /* "ACTION" SAY IF WE ARE ADDING/MODIFYNG A CUSTOMER OF IF WE ARE FILTERING THE CUSTOMER'S LIST*/
            if (!customerToModifyObject) {
              dispatch(saveCustomers(value));
              // props.saveFormData(value);
              setTimeout(() => {
                props.hideModal();
              }, 200);
            } else {
              /*SENDING DATA TO MODIFY AN EXISTING CUSTOMER*/
              props.modifyCustomerList(value, customerToModifyObject.id);
              setTimeout(() => {
                props.hideModal();
              }, 200);
            }
          } else {
            /*SENDING DATA TO FILTER THE CUSTOMER'S LIST*/
            props.filterCustomers(value);
            setTimeout(() => {
              props.hideModal();
            }, 200);
          }
        }}
      >
        <Form className="form">
          <TextInput
            label="Nome"
            id="firstName"
            name="firstName"
            placeholder="Inserisci il nome del cliente"
          />
          <TextInput
            label="Cognome"
            id="lastName"
            name="lastName"
            placeholder="Inserisci il cognome del cliente"
          />
          <PhoneInput
            id="phoneNumber"
            name="phoneNumber"
            label="Recapito telefonico"
            placeholder="Recapito telefonico del cliente"
          />
          <EmailInput
            id="email"
            name="email"
            label="Email"
            placeholder="Email del cliente"
          />
          <Button type={"submit"} function={() => null}>
            Conferma
          </Button>
        </Form>
      </Formik>
    </>
  );
}
