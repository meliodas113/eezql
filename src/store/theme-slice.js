import { createSlice } from "@reduxjs/toolkit";
//set up redux
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false
  },
  reducers: {
    //toggle theme
    changeTheme(state, action) {
      const themeStatus = action.payload;
      state.darkTheme = themeStatus.status;
    }
  }
});

export const themeActions = themeSlice.actions;

export default themeSlice;
