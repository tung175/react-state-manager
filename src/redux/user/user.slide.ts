import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../../types/users";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

const initialState: { listUser: IUsers[] } = {
  listUser: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUser = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
