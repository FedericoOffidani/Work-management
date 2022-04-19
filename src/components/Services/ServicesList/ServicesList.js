import { checkService } from "../redux/ServicesSlice/ServicesSlice";
import { useSelector, useDispatch } from "react-redux";


import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export default function ServicesList(props) {
  const servicesToFilter = props.servicesToFilter;
console.log(props.servicesToFilter)
  const savedServicesList = useSelector((state) => state.service.services);
  const dispatch = useDispatch();

  const filter = () => {
    /*CHECKING IF THERE ARA DATA TO FILTER*/
    if (props.servicesToFilter) {
      let filteredList = savedServicesList.filter((el) => {
        return (
          (el.name.includes(servicesToFilter.name) &&
            servicesToFilter.name !== "") ||
          (el.description.includes(servicesToFilter.description) &&
            servicesToFilter.description !== "") ||
          (el.cost.includes(servicesToFilter.cost) &&
            servicesToFilter.cost !== "") ||
          (el.time.includes(servicesToFilter.time) &&
            servicesToFilter.time !== "")
        );
      });
      return filteredList.map((el, i) => {
        return (
          <tr key={i} className="service">
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.description}</td>
            <td>{el.time}</td>
            <td>{el.cost}</td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkService(el.id))}
              />
            </td>
          </tr>
        );
      });
    } else {
      /*PRINTING THE WHOLE LIST WITHOUT ANY FILTER*/
      return savedServicesList.map((el, i) => {
        return (
          <tr key={i} className="service">
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.description}</td>
            <td>{el.time}</td>
            <td>{el.cost}</td>
            <td>
              <input
                id={el.id}
                key={el.id}
                defaultChecked={el.checked === true ? true : false}
                type="checkbox"
                onClick={() => dispatch(checkService(el.id))}
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Container>
      <h1>Lista dei servizi</h1>
      <Table bordered striped>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{savedServicesList && filter()}</tbody>
      </Table>
    </Container>
  );
}
