import { createSlice } from "@reduxjs/toolkit";

const services = [
  {
    id: 0,
    name: "Taglio veloce",
    description: "Taglio veloce per capelli corti",
    cost: "10 Euro",
    time: "15 Minuti",
    checked: false,
  },

  {
    id: 1,
    name: "Taglio medio",
    description: "Taglio per capelli di media lunghezza",
    cost: "15 Euro",
    time: "30 Minuti",
    checked: false,
  },

  {
    id: 2,
    name: "Taglio lungo",
    description: "Taglio per capelli lunghi",
    cost: "20 Euro",
    time: "45 Minuti",
    checked: false,
  },
];

export const serviceSlice = createSlice({
  name: "service",
  initialState: { services: services },
  reducers: {
    saveServices: {
      reducer(state, action) {
        state.services.push(action.payload);
      },
      prepare(value, selectedOption) {
        return {
          payload: {
            id: Date.now(),
            name: value.name,
            description: value.description,
            cost: value.cost + "€",
            time: value.time + selectedOption,
            checked: false,
          },
        };
      },
    },

    modifyServices: {
      reducer(state, action) {
        const { id, name, description, cost, time } = action.payload;
        const existingService = state.services.find(
          (service) => service.id === id
        );

        if (existingService) {
          existingService.name = name;
          existingService.description = description;
          existingService.cost = cost;
          existingService.time = time;
        }
      },
      prepare(action, selectedOption) {
        return {
          payload: {
            id: action.id,
            name: action.name,
            description: action.description,
            cost: action.cost + "€",
            time: `${action.time}${selectedOption}`,
          },
        };
      },
    },

    checkService: {
      reducer(state, action) {
        const checkedServices = state.services.find(
          (service) => service.id === action.payload
        );
        if (checkedServices) {
          checkedServices.checked = !checkedServices.checked;
        }
      },
    },

    deleteServices: {
      reducer(state) {
        let newList = state.services.filter((el) => el.checked === false);
        state.services = newList;
      },
    },
  },
});

export const {
  saveServices,
  modifyServices,
  deleteServices,
  setServicesToDelete,
  resetServicesToDelete,
  checkService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
