import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
    name: 'events',
    initialState: [
        { id: 1, title: 'todo' }
    ],
    reducers: {
        createEvent: (state, action) => { },
        deleteEvent: (state, action) => { },
        updateEvent: (state, action) => { },

    }
});

export const { createEvent, deleteEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;