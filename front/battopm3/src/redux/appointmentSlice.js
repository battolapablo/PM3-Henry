import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {
    setAppointments: (state, action) => action.payload,
    cancelAppointment: (state, action) => {
      const { id } = action.payload;
      return state.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelado" }
          : appointment
      );
    },
  },
});

export const { setAppointments, cancelAppointment } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
