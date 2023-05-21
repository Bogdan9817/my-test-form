import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./slices/citiesSlice";
import doctorsReducer from "./slices/doctorsSlice";
import specialitiesReducer from "./slices/specialitiesSlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    doctors: doctorsReducer,
    specialities: specialitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
