import { createSlice } from "@reduxjs/toolkit";
//set up redux
const fileSlice = createSlice({
  name: "file",
  initialState: {
    files: [],
    fileUnderEdit: {}
  },
  reducers: {
    //to add file
    addFile(state, action) {
      const fileStatus = action.payload;
      const newFile = {
        fileName: fileStatus.name,
        fileContent: fileStatus.content,
        file: fileStatus.actualFile
      };
      state.files.push(newFile);
    },
    // to delete file
    deleteFile(state, action) {
      const fileName = action.payload;
      for (var i in state.files) {
        if (state.files[i].fileName === fileName.name) {
          state.files.splice(i, 1);
        }
      }
    }
  }
});

export const fileActions = fileSlice.actions;

export default fileSlice;
