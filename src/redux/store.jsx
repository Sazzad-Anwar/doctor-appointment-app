import { configureStore } from '@reduxjs/toolkit'
import AppointmentReducer from './features/AppointmentReducer';
import DateReducer from './features/DateReducer';

const store = configureStore({
    reducer: {
        appointments: AppointmentReducer,
        selectedDate: DateReducer
    }
});

export default store;