import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitStateBlog, IPlayLoadBlog } from "../../types/blogs";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await fetch("http://localhost:8000/blogs");
  const data = await res.json();
  return data;
});

export const createNewBlog = createAsyncThunk(
  "blogs/createNewBlog",
  async (payload: IPlayLoadBlog, thunkAPI) => {
    const res = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlogs());
    }
    console.log(res);

    return data;
  }
);

export const updateNewBlog = createAsyncThunk(
  "blogs/updateNewBlog",
  async (payload: IPlayLoadBlog, thunkAPI) => {
    console.log("PL", payload);

    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
        author: payload.author,
        content: payload.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchBlogs());
    }
    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteNewBlog",
  async (payload: IPlayLoadBlog, thunkAPI) => {
    await fetch(`http://localhost:8000/blogs/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    thunkAPI.dispatch(fetchBlogs());
  }
);

const initialState: IInitStateBlog = {
  listBlog: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const blogSlice = createSlice({
  name: "blog",
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
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      // Add blog to the state array
      state.listBlog = action.payload;
    }),
      builder.addCase(createNewBlog.fulfilled, (state) => {
        // Add blog to the state array
        state.isCreateSuccess = true;
      }),
      builder.addCase(updateNewBlog.fulfilled, (state) => {
        // Add blog to the state array
        state.isUpdateSuccess = true;
      }),
      builder.addCase(deleteBlog.fulfilled, (state) => {
        // Add blog to the state array
        state.isDeleteSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = blogSlice.actions;

export default blogSlice.reducer;
