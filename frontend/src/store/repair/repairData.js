import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {}
};

const repairSlice = createSlice({
    name: 'repair',
    initialState,
    reducers: {
        setRepair: (state, action) => {
            state.value = action.payload
        },
        deleteRepair: (state) => {
           state.value = {}
        }
    }
});

export const {setRepair, deleteRepair} = repairSlice.actions;
export default repairSlice.reducer;