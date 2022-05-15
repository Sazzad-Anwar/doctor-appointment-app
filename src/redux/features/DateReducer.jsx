import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const dateSlice = createSlice({
  name: "selectedDate",
  initialState: {
    day: dayjs().date(dayjs().date()).format("DD"),
    year: dayjs().year(dayjs().year()).format("YYYY"),
    month: dayjs().month(dayjs().month()).format("M"),
  },
  reducers: {
    selectDay: (state, action) => {
      return { ...state, day: action.payload };
    },
    selectYear: (state, action) => {
      return { ...state, year: action.payload };
    },
    selectMonth: (state, action) => {
      return { ...state, month: action.payload };
    },
  },
});

export const { selectDay, selectYear, selectMonth } = dateSlice.actions;
export default dateSlice.reducer;
