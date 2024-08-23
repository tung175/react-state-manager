import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed"
}

const initialState: CounterState = {
  value: 0,
  status: "idle"
}

export const  incrementSagaFinish = createAction<{value: number}>("incrementSagaFinish")
export const  decrementSagaFinish = createAction<{value: number}>("decrementSagaFinish")

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    incrementSagaStart: (state) => {
      state.status = "loading"
    },
    incrementSagaFinish: (state, action) => {
      state.status = "idle"
      state.value += action.payload.value
    },
    decrementSagaStart: (state) => {
      state.status = "loading"
    },
    decrementSagaFinish: (state, action) => {
      state.status = "idle"
      state.value -= action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(incrementSagaFinish, (state, action) => {
      state.status = "idle"
      state.value += action.payload.value
    })
    .addCase(decrementSagaFinish, (state, action) => {
      state.status = "idle"
      state.value -= action.payload.value
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, incrementSagaStart, decrementSagaStart } = counterSlice.actions

export default counterSlice.reducer