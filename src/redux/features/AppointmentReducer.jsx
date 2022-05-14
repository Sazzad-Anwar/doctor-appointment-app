import { createSlice } from '@reduxjs/toolkit'

export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [],
    reducers: {
        createAppointment: (state, action) => {
            localStorage.setItem('appointments', JSON.stringify([...state, action.payload]))
            state.push(action.payload)
        },
    }
});

export const { createAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;