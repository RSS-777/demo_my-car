import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddingCar: false,
};

const addCarSlice = createSlice({
  name: "addCar",
  initialState,
  reducers: {
    startAddingCar: (state) => {
      state.isAddingCar = true;
    },
    stopAddingCar: (state) => {
      state.isAddingCar = false;
    },
  },
});

export default addCarSlice.reducer;
export const { startAddingCar, stopAddingCar } = addCarSlice.actions;