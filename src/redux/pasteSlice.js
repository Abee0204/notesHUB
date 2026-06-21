import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    pastes:localStorage.getItem("pastes") ?
        JSON.parse(localStorage.getItem("pastes")):[]
    
}

export const pasteSlice = createSlice({
    name:'pastes',
    initialState,
    reducers:{
        addToPastes : (state ,action) =>{

        },

        updateToPastes : (state , action) =>{

        },

        resetAllPastes :(state , action) =>{

        },

        removeFromPastes: (state ,action) =>{

        },
    },
})

export const {addToPastes , updateToPastes ,resetAllPastes ,removeFromPastes} = pasteSlice.actions;
export default pasteSlice.reducer;