import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [], //initilize as an array so multiple movies can be stored 
    filter: ""
  },
  reducers: {
    setMovies: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setMovies, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;