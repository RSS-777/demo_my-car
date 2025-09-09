import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import langReducer from './lang/langSlice';
import userReducer from './user/userSlice';
import repairReducer from './repair/repairData';
import changeRepairFlagReducer from './repair/changeRepairFlagSlice';
import adminReducer from './admin/adminSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        lang: langReducer,
        user: userReducer,
        repair: repairReducer,
        flag: changeRepairFlagReducer,
        admin: adminReducer
    },
    devTools: import.meta.env.VITE_REACT_APP_PROJECT !== 'production',
});