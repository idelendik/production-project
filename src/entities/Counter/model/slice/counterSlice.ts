import { createSlice } from "@reduxjs/toolkit";
import { CounterSchema } from "../types/counterSchema";

const initialState: CounterSchema = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        decrement: (state: CounterSchema) => {
            state.value -= 1;
        },
        increment: (state: CounterSchema) => {
            state.value += 1;
        },
    }
})

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;