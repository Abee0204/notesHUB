import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("Notes")
    ? JSON.parse(localStorage.getItem("Notes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const exists = state.pastes.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.pastes.push(action.payload);
      }

      localStorage.setItem("Notes", JSON.stringify(state.pastes));
      toast("Added to localStorage");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("Notes", JSON.stringify(state.pastes));
        toast.success("Note Updated");
      } else {
        state.pastes.push(paste);
        localStorage.setItem("Notes", JSON.stringify(state.pastes));
        toast("Added to Notes");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.setItem("Notes", JSON.stringify(state.pastes));
      toast.success("Removed all Notes");
    },

    removeFromPastes: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item) => item.id === paste.pasteID);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("Notes", JSON.stringify(state.pastes));
        toast.success("Removed from pastes");
      } else {
        toast.error("Unable to Remove");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;
export default pasteSlice.reducer;
