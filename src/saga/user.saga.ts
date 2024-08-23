import { IUsers } from "./../types/users";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  createUsersFailed,
  createUsersPending,
  createUsersSuccess,
  deleteUsersFailed,
  deleteUsersPending,
  deleteUsersSuccess,
  fetchUsersFailed,
  fetchUsersPending,
  fetchUsersSuccess,
  updateUsersFailed,
  updateUsersPending,
  updateUsersSuccess,
} from "../redux/user/user.slide";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:8000/users");
  return res.json();
};

const createUsers = async (email: string, name: string) => {
  const res = await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const updateUsers = async (id: number, email: string, name: string) => {
  const res = await fetch(`http://localhost:8000/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      email,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const deleteUsers = async (id: number) => {
  const res = await fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

function* handleFetchUser() {
  try {
    const users: IUsers[] = yield call(fetchUsers);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailed());
  }
}

function* handleCreateUser(
  action: PayloadAction<{ email: string; name: string }>
) {
  try {
    yield call(createUsers, action.payload.email, action.payload.name);
    yield put(createUsersSuccess());
    yield put(fetchUsersPending());
  } catch (error) {
    yield put(createUsersFailed());
  }
}

function* handleUpdateUser(
  action: PayloadAction<{ id: number; email: string; name: string }>
) {
  try {
    yield call(
      updateUsers,
      action.payload.id,
      action.payload.email,
      action.payload.name
    );
    yield put(updateUsersSuccess());
    yield put(fetchUsersPending());
  } catch (error) {
    yield put(updateUsersFailed());
  }
}

function* handleDeleteUser(action: PayloadAction<{ id: number }>) {
  try {
    yield call(deleteUsers, action.payload.id);
    yield put(deleteUsersSuccess());
    yield put(fetchUsersPending());
  } catch (error) {
    yield put(deleteUsersFailed());
  }
}

function* userSaga() {
  yield takeEvery(fetchUsersPending, handleFetchUser);
  yield takeEvery(createUsersPending, handleCreateUser);
  yield takeEvery(updateUsersPending, handleUpdateUser);
  yield takeEvery(deleteUsersPending, handleDeleteUser);
}

export default userSaga;
