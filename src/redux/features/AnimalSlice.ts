import { createSlice } from "@reduxjs/toolkit";
import { IAnimal } from "../../models/IAnimal";
import { getList, save } from "../../services/StorageService";
import { IAction } from "../models/IAction";
import axios from "axios";

let defaultValue: IAnimal[] = getList<IAnimal>();

const animalSlice = createSlice({
  name: "animals",
  initialState: { value: defaultValue },
  reducers: {
    feedAnimal: (state, action: IAction<number>) => {
      state.value[action.payload].isFed = true;
      save(state.value);
    },
    set: (state, action: IAction<IAnimal[]>) => {
      state.value = action.payload;
      save(state.value);
    },
  },
});

export const { feedAnimal, set } = animalSlice.actions;
export default animalSlice.reducer;
