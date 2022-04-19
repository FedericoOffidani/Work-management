import React from "react";
import Query from "devextreme/data/query";
import { services, employees } from "./data.js";

function getServiceById(id) {
  return Query(services).filter(["id", id]).toArray()[0];
}
function getEmployeeById(id) {
  return Query(employees).filter(["id", id]).toArray()[0];
}
export default class AppointmentTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: getServiceById(props.data.appointmentData.serviceId),
      employeeData: getEmployeeById(props.data.appointmentData.employeeId),
    };
  }

  render() {
    const { serviceData, employeeData } = this.state;
    return (
      <div className="movie-tooltip">
        <div className="movie-info">
          <div className="movie-title">
            Servizio: {serviceData.name} ({serviceData.cost})
          </div>
          <hr />
          <ul>
            Dati impiegato:
            <li>Nome: {employeeData.firstName}</li>
            <li>Cognome: {employeeData.lastName}</li>
          </ul>
        </div>
      </div>
    );
  }
}
