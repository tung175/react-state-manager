import { createAction, createSlice } from "@reduxjs/toolkit";
import { IBlogs, IInitStateBlog } from "../../types/blogs";

const initialState: IInitStateBlog = {
  data: [],
  errors: [],
  isPending: false,
  isError: false,
  isCreating: false,
  isCreateSuccess: false,
  isUpdating: false,
  isUpdateSuccess: false,
  isDeleting: false,
  isDeleteSuccess: false,
};

export const fetchBlogsPending = createAction("fetchBlogsPending");
export const fetchBlogsSuccess = createAction<IBlogs[]>("fetchBlogsSuccess");
export const fetchBlogsFailed = createAction("fetchBlogsFailed");

export const createBlogsPending = createAction<{
  author: string;
  content: string;
  title: string;
}>("createBlogsPending");
export const createBlogsSuccess = createAction("createBlogsSuccess");
export const createBlogsFailed = createAction("createBlogsFailed");

export const updateBlogsPending = createAction<IBlogs>("updateBlogsPending");
export const updateBlogsSuccess = createAction("updateBlogsSuccess");
export const updateBlogsFailed = createAction("updateBlogsFailed");

export const deleteBlogsPending = createAction<IBlogs>("deleteBlogsPending");
export const deleteBlogsSuccess = createAction("deleteBlogsSuccess");
export const deleteBlogsFailed = createAction("deleteBlogsFailed");

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchBlogsPending, (state) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(fetchBlogsSuccess, (state, action) => {
        state.isPending = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogsFailed, (state) => {
        state.isPending = false;
        state.isError = true;
      })
      .addCase(createBlogsPending, (state) => {
        state.isCreating = true;
        state.isCreateSuccess = false;
      })
      .addCase(createBlogsSuccess, (state) => {
        state.isCreating = false;
        state.isCreateSuccess = true;
      })
      .addCase(createBlogsFailed, (state) => {
        state.isPending = false;
        state.isError = true;
      })
      .addCase(updateBlogsPending, (state) => {
        state.isUpdating = true;
        state.isUpdateSuccess = false;
      })
      .addCase(updateBlogsSuccess, (state) => {
        state.isUpdating = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateBlogsFailed, (state) => {
        state.isUpdating = false;
        state.isUpdateSuccess = true;
      })
      .addCase(deleteBlogsPending, (state) => {
        state.isDeleting = true;
        state.isDeleteSuccess = false;
      })
      .addCase(deleteBlogsSuccess, (state) => {
        state.isDeleting = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteBlogsFailed, (state) => {
        state.isDeleting = false;
        state.isDeleteSuccess = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = blogSlice.actions;

export default blogSlice.reducer;
