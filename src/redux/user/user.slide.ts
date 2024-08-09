import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitStateUser, IPlayLoad } from "../../types/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("http://localhost:8000/users");
  const data = await res.json();
  return data;
});

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IPlayLoad, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchUsers());
    }
    return data;
  }
);

export const updateNewUser = createAsyncThunk(
  "users/updateNewUser",
  async (payload: IPlayLoad, thunkAPI) => {
    console.log("PL", payload);

    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchUsers());
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteNewUser",
  async (payload: IPlayLoad, thunkAPI) => {
    console.log("PL", payload);

    await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    thunkAPI.dispatch(fetchUsers());
  }
);

const initialState: IInitStateUser = {
  listUser: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
    },
    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },
    resetDelete(state) {
      state.isDeleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUser = action.payload;
    }),
      builder.addCase(createNewUser.fulfilled, (state) => {
        // Add user to the state array
        state.isCreateSuccess = true;
      }),
      builder.addCase(updateNewUser.fulfilled, (state) => {
        // Add user to the state array
        state.isUpdateSuccess = true;
      }),
      builder.addCase(deleteUser.fulfilled, (state) => {
        // Add user to the state array
        state.isDeleteSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
