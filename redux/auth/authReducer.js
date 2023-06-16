import {createSlice} from '@reduxjs/toolkit';



 export const authSlice = createSlice({
    name:'auth',
    initialState: {
        userId: null,
        nickname: null,
        statChange: null,
    },
    reducers: {
updateUserProfile:(state,{payload}) => ({
    ...state,
    userId: payload.nickname
})
    }
    
});

console.log("authSlice",authSlice)