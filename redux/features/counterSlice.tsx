import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  supportingLangs: string[];
  name: string;
  count: number;
};

const initialState = {
    supportingLangs: ["m"],
    name: "ram",
    count: 0
} as CounterState;

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
        console.log("hi");
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
    addName: (state, action: PayloadAction<string>) => {
        state.name+= action.payload;
    },
    setSupportingLangs: (state, action: PayloadAction<string>) => {
        state.supportingLangs.push(action.payload);
        console.log("supporting", state.supportingLangs, action.payload)
    }
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  addName,
  setSupportingLangs,
  decrementByAmount,
  reset,
} = counter.actions;
export default counter.reducer;
