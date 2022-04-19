export const appointments = [
  {
    id: 1,
    serviceId: 1,
    employeeId: 1,
    duration: 30,
    startDate: new Date("2022-04-02T09:00:00.000Z"),
    endDate: new Date("2022-04-02T11:00:00.000Z"),
    allDay: false,
  },
  {
    id: 2,
    serviceId: 2,
    employeeId: 3,
    duration: 30,
    startDate: new Date("2022-04-03T10:15:00.000Z"),
    endDate: new Date("2022-04-03T13:30:00.000Z"),
    allDay: false,
  },
  {
    id: 3,
    serviceId: 4,
    employeeId: 2,
    duration: 30,
    startDate: new Date("2022-04-04T08:00:00.000Z"),
    endDate: new Date("2022-04-04T10:00:00.000Z"),
    allDay: false,
  },
  {
    id: 4,
    serviceId: 2,
    employeeId: 3,
    duration: 30,
    startDate: new Date("2022-04-05T08:00:00.000Z"),
    endDate: new Date("2022-04-05T10:30:00.000Z"),
    allDay: false,
  },
  {
    id: 5,
    serviceId: 4,
    employeeId: 2,
    duration: 30,
    startDate: new Date("2022-04-01T09:00:00.000Z"),
    endDate: new Date("2022-04-01T10:00:00.000Z"),
    allDay: false,
  },
];

export const employees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
  },
  {
    id: 2,
    firstName: "Andrea",
    lastName: "Rossi",
  },
  {
    id: 3,
    firstName: "Luca",
    lastName: "Neri",
  },
  {
    id: 4,
    firstName: "Antonio",
    lastName: "Grigi",
  },
];

export const services = [
  {
    id: 1,
    name: "Taglio veloce",
    cost: "10 $",
  },
  {
    id: 2,
    name: "Taglio medio",
    cost: "12 $",
  },
  {
    id: 3,
    name: "Taglio Lungo",
    cost: "15 $",
  },
  {
    id: 4,
    name: "Lavaggio",
    cost: "5 $",
  },
];
