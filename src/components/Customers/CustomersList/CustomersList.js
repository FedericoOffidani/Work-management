// import "./customersList.css";
import { checkCustomer } from "../redux/Slice/CustomersSlice";
import { useSelector, useDispatch } from "react-redux";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export default function CustomersList(props) {
  const customersToFilter = props.customersToFilter;

  const savedCustomersList = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  const showText = savedCustomersList;

  const filter = () => {
    /*CHECKING IF THERE ARA DATA TO FILTER*/
    if (props.customersToFilter) {
      let filteredList = showText.filter((el) => {
        return (
          (el.firstName.includes(customersToFilter.firstName) &&
            customersToFilter.firstName !== "") ||
          (el.lastName.includes(customersToFilter.lastName) &&
            customersToFilter.lastName !== "") ||
          (el.phoneNumber.includes(customersToFilter.phoneNumber) &&
            customersToFilter.phoneNumber !== "") ||
          (el.email.includes(customersToFilter.email) &&
            customersToFilter.email !== "")
        );
      });
      return filteredList.map((el, i) => {
        return (
          <tr key={i} className="customer">
            <td>{el.id}</td>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.email}</td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkCustomer(el.id))}
              />
            </td>
          </tr>
        );
      });
    } else {
      /*PRINTING THE WHOLE LIST WITHOUT ANY FILTER*/
      return showText.map((el, i) => {
        return (
          <tr key={i} className="customer">
            <td>{el.id}</td>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.email}</td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkCustomer(el.id))}
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Container>
      <h1>Lista dei clienti</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{showText && filter()}</tbody>
      </Table>
    </Container>
  );
}
