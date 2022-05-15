import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState: localStorage.getItem("appointments")
    ? JSON.parse(localStorage.getItem("appointments"))
    : [],
  reducers: {
    createAppointment: (state, action) => {
      let sortedArray = (array) => {
        return array.sort((a, b) => {
          const date1 = new Date(a.date + " " + a.time);
          const date2 = new Date(b.date + " " + b.time);
          return date1 - date2;
        });
      };

      localStorage.setItem(
        "appointments",
        JSON.stringify(sortedArray([...state, action.payload]))
      );
      state.push(action.payload);
      sortedArray(state);
    },
  },
});

export const { createAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
