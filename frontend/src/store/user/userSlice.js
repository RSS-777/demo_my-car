import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null,
    tariff: null
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setName(state, action) {
      state.name = action.payload
    },
    deleteName(state) {
      state.name = null
    },
    setTariff(state, action) { 
      state.tariff = action.payload;
    },
    clearTariff(state) { 
      state.tariff = null;
    }
  }
});

export const { setToken, clearToken, setName, deleteName, setTariff, clearTariff } = userSlice.actions;
export default userSlice.reducer;