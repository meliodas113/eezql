import { createSlice } from "@reduxjs/toolkit";
//set up redux
const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoggedIn: false,
    avatar: "https://ik.imagekit.io/7yriydcici/child-1837375_1280_veh-30Uzb.png"
  },
  reducers: {
    //set avatar
    setAvatar(state, action) {
      const avatar = action.payload;
      state.avatar = avatar.avatar;
      // state.userLoggedIn = true;
    },
    //change login status of user
    changeLogInStatus(state) {
      state.userLoggedIn = true;
    },
    //logout function
    logOut(state) {
      state.userLoggedIn = false;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice;
