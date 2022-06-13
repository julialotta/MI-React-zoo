import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "./features/AnimalSlice";

export default configureStore({
  reducer: {
    animals: animalReducer,
  },
});
