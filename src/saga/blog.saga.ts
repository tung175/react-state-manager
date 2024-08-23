import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IBlogs } from "../types/blogs";
import {
  createBlogsFailed,
  createBlogsPending,
  createBlogsSuccess,
  deleteBlogsFailed,
  deleteBlogsPending,
  deleteBlogsSuccess,
  fetchBlogsFailed,
  fetchBlogsPending,
  fetchBlogsSuccess,
  updateBlogsFailed,
  updateBlogsPending,
  updateBlogsSuccess,
} from "../redux/blog/blog.slide";

const fetchBlogs = async () => {
  const res = await fetch("http://localhost:8000/blogs");
  console.log(111, res);

  return res.json();
};

const createBlogs = async (author: string, content: string, title: string) => {
  const res = await fetch("http://localhost:8000/blogs", {
    method: "POST",
    body: JSON.stringify({
      author,
      content,
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const updateBlogs = async (id: number, author: string, content: string, title: string) => {
  const res = await fetch(`http://localhost:8000/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      author,
      content,
      title
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const deleteBlogs = async (id: number) => {
  const res = await fetch(`http://localhost:8000/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

function* handleFetchBlog() {
  try {
    const blogs: IBlogs[] = yield call(fetchBlogs);
    yield put(fetchBlogsSuccess(blogs));
  } catch (error) {
    yield put(fetchBlogsFailed());
  }
}

function* handleCreateBlog(
  action: PayloadAction<{
    author: string;
    content: string;
    title: string;
  }>
) {
  try {
    yield call(
      createBlogs,
      action.payload.author,
      action.payload.content,
      action.payload.title
    );
    yield put(createBlogsSuccess());
    yield put(fetchBlogsPending());
  } catch (error) {
    yield put(createBlogsFailed());
  }
}

function* handleUpdateBlog(
  action: PayloadAction<{ id: number; author: string; content: string; title: string }>
) {
  try {
    yield call(
      updateBlogs,
      action.payload.id,
      action.payload.author,
      action.payload.content,
      action.payload.title

    );
    yield put(updateBlogsSuccess());
    yield put(fetchBlogsPending());
  } catch (error) {
    yield put(updateBlogsFailed());
  }
}

function* handleDeleteBlog(action: PayloadAction<{ id: number }>) {
  try {
    yield call(deleteBlogs, action.payload.id);
    yield put(deleteBlogsSuccess());
    yield put(fetchBlogsPending());
  } catch (error) {
    yield put(deleteBlogsFailed());
  }
}

function* blogSaga() {
  yield takeEvery(fetchBlogsPending, handleFetchBlog);
  yield takeEvery(createBlogsPending, handleCreateBlog);
  yield takeEvery(updateBlogsPending, handleUpdateBlog);
  yield takeEvery(deleteBlogsPending, handleDeleteBlog);
}

export default blogSaga;
