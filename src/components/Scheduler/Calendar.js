import React from "react";
import "devextreme/dist/css/dx.light.css";
import "./Calendar.css";
import { appointments, employees, services } from "./data.js";
import Appointment from "./Appointment.js";
import AppointmentTooltip from "./AppointmentTooltip.js";
import Scheduler, { View, Editing, Resource } from "devextreme-react/scheduler";
import Query from "devextreme/data/query";
import { useCallback, useState } from "react";

// const renderAppointment = (model) => {
//   return (
//     <React.Fragment>
//       {console.log(model.data)}
//       <i>{model.appointmentData.serviceId}</i>
//       <p>Impiegato: {model.appointmentData.employee}</p>
//     </React.Fragment>
//   );
// };

// const renderAppointmentTooltip = (model) => {
//   return (
//     <div style={{ height: "100px" }}>
//       <i>
//         {model.appointmentData.service} ({model.appointmentData.employee})
//       </i>
//     </div>
//   );
// };

const onAppointmentFormOpening = (e) => {
  const { form } = e;
  let appointmentInfo = getAppointmentById(e.appointmentData.serviceId) || {};
  let { startDate } = e.appointmentData;

  form.option("items", [
    {
      label: {
        text: "Service",
      },
      editorType: "dxSelectBox",
      dataField: "serviceId",
      editorOptions: {
        items: services,
        displayExpr: "name",
        valueExpr: "id",
        onValueChanged(args) {
          appointmentInfo = getAppointmentById(args.value);

          form.updateData("name", appointmentInfo.service);
          form.updateData(
            "endDate",
            new Date(startDate.getTime() + 60 * 1000 * appointmentInfo.duration)
          );
        },
      },
    },
    {
      label: {
        text: "Employee",
      },
      editorType: "dxSelectBox",
      dataField: "employeeId",
      editorOptions: {
        items: employees,
        displayExpr: "firstName",
        valueExpr: "id",
        onValueChanged(args) {
          appointmentInfo = getAppointmentById(args.value);
          form.updateData("firstName", appointmentInfo.employee);
          form.updateData(
            "endDate",
            new Date(startDate.getTime() + 60 * 1000 * appointmentInfo.duration)
          );
        },
      },
    },

    {
      dataField: "startDate",
      editorType: "dxDateBox",
      editorOptions: {
        width: "100%",
        type: "datetime",
        onValueChanged(args) {
          startDate = args.value;
          form.updateData(
            "endDate",
            new Date(startDate.getTime() + 60 * 1000 * appointmentInfo.duration)
          );
        },
      },
    },
    {
      name: "endDate",
      dataField: "endDate",
      editorType: "dxDateBox",
      editorOptions: {
        width: "100%",
        type: "datetime",
        readOnly: true,
      },
    },
  ]);
};

function getAppointmentById(id) {
  return Query(appointments).filter(["id", id]).toArray()[0];
}

function SchedulerApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handlePropertyChange = useCallback((e) => {
    if (e.name === "currentDate") {
      setCurrentDate(e.value);
    }
  }, []);

  return (
    <Scheduler
      dataSource={appointments} //Dati da mostrare sul calendario
      textExpr="service" //Chiave identificativa del valore (presente in data.js) da renderizzare sulla card appuntamento
      allDayExpr="allDay" //Chiave identificativa del valore allDay (presente in data.js) da renderizzare sulla card appuntamento
      recurrenceRuleExpr="recurrence"
      currentDate={currentDate} //Giorno corrente
      onOptionChanged={handlePropertyChange}
      defaultCurrentView="week" //Default view del calendario
      timeZone="Europe/Rome"
      adaptivityEnabled={true} //Cambio automatico di dimensioni per schermi di grandezze diverse
      appointmentComponent={Appointment} // Nel componente Appointment.js specificando i dati è possibile mostrarli nelle card che compaiono sul calendario
      appointmentTooltipComponent={AppointmentTooltip} // Nel componente AppointmentTooltip.js specificando i dati è possibile mostrarli nella modale al click della card nel calendario
      onAppointmentFormOpening={onAppointmentFormOpening} // Form customizzato per salvataggio e modifica dati
    >
      <View type="day" startDayHour={9} endDayHour={18} />
      <View type="week" startDayHour={9} endDayHour={18} />
      <View type="month" />

      <Editing allowDragging={true} allowTimeZoneEditing={false} />
    </Scheduler>
  );
}

export default SchedulerApp;
