import { createAction, createSlice } from "@reduxjs/toolkit";
import { IInitStateUser, IUsers } from "../../types/users";

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   const res = await fetch("http://localhost:8000/users");
//   const data = await res.json();
//   return data;
// });

const initialState: IInitStateUser = {
  data: [],
  errors: [],
  isPending: false,
  isError: false,
  isCreating: false,
  isCreateSuccess:false,
  isUpdating: false,
  isUpdateSuccess:false,
  isDeleting: false,
  isDeleteSuccess:false,
};

export const fetchUsersPending = createAction("fetchUsersPending");
export const fetchUsersSuccess = createAction<IUsers[]>("fetchUsersSuccess");
export const fetchUsersFailed = createAction("fetchUsersFailed");

export const createUsersPending = createAction<{email: string, name: string}>("createUsersPending");
export const createUsersSuccess = createAction("createUsersSuccess");
export const createUsersFailed = createAction("createUsersFailed");

export const updateUsersPending = createAction<IUsers>("updateUsersPending");
export const updateUsersSuccess = createAction("updateUsersSuccess");
export const updateUsersFailed = createAction("updateUsersFailed");

export const deleteUsersPending = createAction<IUsers>("deleteUsersPending");
export const deleteUsersSuccess = createAction("deleteUsersSuccess");
export const deleteUsersFailed = createAction("deleteUsersFailed");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUsersPending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(fetchUsersSuccess, (state, action) => {
        state.isPending = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchUsersFailed, (state) => {
        state.isPending = false;
        state.isError = true;
      })
      .addCase(createUsersPending, (state) => {
        state.isCreating = true;
        state.isCreateSuccess = false;
      })
      .addCase(createUsersSuccess, (state) => {
        state.isCreating = false;
        state.isCreateSuccess = true;
      })
      .addCase(createUsersFailed, (state) => {
        state.isPending = false;
        state.isError = true;
      })
      .addCase(updateUsersPending, (state) => {
        state.isUpdating = true;
        state.isUpdateSuccess = false;
      })
      .addCase(updateUsersSuccess, (state) => {
        state.isUpdating = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateUsersFailed, (state) => {
        state.isUpdating = false;
        state.isUpdateSuccess = true;
      })
      .addCase(deleteUsersPending, (state) => {
        state.isDeleting = true;
        state.isDeleteSuccess = false;
      })
      .addCase(deleteUsersSuccess, (state) => {
        state.isDeleting = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteUsersFailed, (state) => {
        state.isDeleting = false;
        state.isDeleteSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
