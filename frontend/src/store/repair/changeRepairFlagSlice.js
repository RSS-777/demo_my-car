import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

const changeRepairFlagSlice = createSlice({
    name: 'flag',
    initialState,
    reducers: {
        setChangeRepair: (state, action) => {
            state.value =  action.payload
        }
    }
});

export const { setChangeRepair } = changeRepairFlagSlice.actions;
export default changeRepairFlagSlice.reducer;