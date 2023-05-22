import { createSlice } from "@reduxjs/toolkit";

export type Sex = "male" | "female";

type PersonState = {
  name: string | undefined;
  age: string | undefined;
  city: string | undefined;
  doctor: string | undefined;
  sex: Sex | undefined;
  speciality: string | undefined;
  phone: string | undefined;
  email: string | undefined;
};

const initialState: PersonState = {
  name: "",
  age: undefined,
  city: "",
  doctor: "",
  speciality: "",
  phone: "",
  email: "",
  sex: undefined,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    updateValue: (state, { payload }: { payload: Partial<PersonState> }) => {
      const key = Object.keys(payload)[0];
      // @ts-ignore
      state[key] = Object.values(payload)[0];
    },
  },
});

export const { updateValue } = personSlice.actions;

export default personSlice.reducer;
