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
      const animal = state.value.find((a) => a.id === action.payload);
      if (animal) {
        animal.isFed = true;
        animal.lastFed = new Date().toLocaleString();
        save(state.value);
      }
    },
    unFeedAnimal: (state, action: IAction<number>) => {
      const animal = state.value.find((a) => a.id === action.payload);
      if (animal) {
        animal.isFed = false;
        save(state.value);
      }
    },
    animalUnFeedTimer: (state) => {
      for (let i = 0; i < state.value.length; i++) {
        let difference =
          (Date.now() - new Date(state.value[i].lastFed).getTime()) / 3600000;
        if (difference > 3) state.value[i].isFed = false;
        save(state.value);
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
