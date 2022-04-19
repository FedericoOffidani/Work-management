import { checkEmployee } from "../../features/employee/employeeSlice";
import { useSelector, useDispatch } from "react-redux";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export default function EmployeesList(props) {
  const employeesToFilter = props.employeesToFilter;

  const employeesList = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();

  /**
   * Returns true if value of first array is equal to value of second array.
   *
   * @param {arr1} arr1 first array to compare.
   * @param {arr2} arr2 second array to compare.
   */
  function compareArrays(arr1, arr2) {
    if (arr1.length === 1 && arr2.length > 1) {
      return false;
    } else if (arr2.length === 1 && arr1.length > 1) {
      return arr1.some((el) => el.name === arr2[0].name);
    } else if (
      arr1.length === arr2.length &&
      arr1.length > 1 &&
      arr2.length > 1
    ) {
      for (var j = 0; j < arr2.length; j++) {
        for (var x = 0; x < arr2.length; x++) {
          if (
            (arr1[j].name === arr2[j].name && arr1[x].name === arr2[x].name) ||
            (arr1[j].name === arr2[x].name && arr1[x].name === arr2[j].name)
          ) {
            return arr1.every((el, i) => el.name === arr2[i].name);
          }
        }
      }
    } else if (arr2.length === 1 && arr1.length === 1) {
      return arr1.every((el) => el.name === arr2[0].name);
    }
  }

  const filter = () => {
    /*CHECKING IF THERE ARA DATA TO FILTER*/
    if (props.employeesToFilter) {
      console.log(employeesToFilter.services[0]);
      let filteredList = employeesList.filter((el) => {
        console.log(el);
        return (
          (el.firstName.includes(employeesToFilter.firstName) &&
            employeesToFilter.firstName !== "") ||
          (el.lastName.includes(employeesToFilter.lastName) &&
            employeesToFilter.lastName !== "") ||
          (el.phoneNumber.includes(employeesToFilter.phoneNumber) &&
            employeesToFilter.phoneNumber !== "") ||
          (el.email.includes(employeesToFilter.email) &&
            employeesToFilter.email !== "") ||
          compareArrays(el.services, employeesToFilter.services[0])
          // (
          //   el.services.some((service) => {
          //   for (var i = 0; i < employeesToFilter.services[0].length; i++) {
          //     for (var j = 0; j < service.length; j++) {
          //       if (employeesToFilter.services[0][i].name === service[j].name) {
          //         return true;
          //       }
          //     }
          //   }
          // }) &&
          //   employeesToFilter.services[0] !== "")
        );
      });

      return filteredList.map((el, i) => {
        return (
          <tr key={i}>
            <td>{el.id}</td>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.email}</td>
            <td>
              {el.services &&
                el.services.map((service, i) => {
                  return (
                    <span key={i}>
                      <p>{service.name}</p>
                    </span>
                  );
                })}
            </td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkEmployee(el.id))}
              />
            </td>
          </tr>
        );
      });
    } else {
      /*PRINTING THE WHOLE LIST WITHOUT ANY FILTER*/
      return employeesList.map((el, i) => {
        return (
          <tr key={i}>
            <td>{el.id}</td>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.phoneNumber}</td>
            <td>{el.email}</td>

            <td>
              {el.services &&
                el.services.map((service, i) => {
                  return (
                    <span key={i}>
                      <p>{service.name}</p>
                    </span>
                  );
                })}
            </td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkEmployee(el.id))}
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Container>
      <h1>Lista impiegati</h1>
      <Table bordered striped>
        <thead>
          <tr>
            <th>#ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{employeesList && filter()}</tbody>
      </Table>
    </Container>
  );
}
