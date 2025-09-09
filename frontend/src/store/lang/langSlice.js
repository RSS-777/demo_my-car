import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'ua'
};

export const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLang: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {changeLang} = langSlice.actions
export default langSlice.reducer;