import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
        },
        deleteToken: (state) => {
            state.value = null
        }
    }
});

export default adminSlice.reducer;
export const {setToken, deleteToken} = adminSlice.actions;