import React from "react";
import Query from "devextreme/data/query";
import { services, employees } from "./data.js";

function getServiceById(id) {
  return Query(services).filter(["id", id]).toArray()[0];
}
function getEmployeeById(id) {
  return Query(employees).filter(["id", id]).toArray()[0];
}

export default function Appointment(model) {
  const { targetedAppointmentData } = model.data;

  const serviceData = getServiceById(targetedAppointmentData.serviceId) || {};
  const employeeData =
    getEmployeeById(targetedAppointmentData.employeeId) || {};

  return (
    <div className="showtime-preview">
      <div>Servizio: {serviceData.name}</div>
      <div>Impiegato: {employeeData.firstName}</div>
    </div>
  );
}
