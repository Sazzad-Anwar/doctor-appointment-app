import { configureStore } from '@reduxjs/toolkit'
import DateReducer from './features/DateReducer';
import EventReducer from './features/EventReducer';

const store = configureStore({
    reducer: {
        events: EventReducer,
        selectedDate: DateReducer
    }
});

export default store;