import { createSlice } from "@reduxjs/toolkit";
import { IAnimal } from "../../models/IAnimal";
import { getList, save } from "../../services/StorageService";
import { IAction } from "../models/IAction";

let defaultValue: IAnimal[] = getList<IAnimal>();

const animalSlice = createSlice({
  name: "animals",
  initialState: { value: defaultValue },
  reducers: {
    feedAnimal: (state, action: IAction<number>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].id === action.payload) {
          state.value[i].isFed = true;
          state.value[i].lastFed = new Date().toLocaleString();
          save(state.value);
        }
      }
    },
    unFeedAnimal: (state, action: IAction<number>) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].id === action.payload) {
          state.value[i].isFed = false;
          save(state.value);
        }
      }
    },
    set: (state, action: IAction<IAnimal[]>) => {
      state.value = action.payload;
      save(state.value);
    },
  },
});

export const { feedAnimal, set, unFeedAnimal } = animalSlice.actions;
export default animalSlice.reducer;
