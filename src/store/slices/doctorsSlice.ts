import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

type Doctor = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
};

export type DoctorsState = {
  all: Doctor[];
  load: boolean;
  error: string | null;
};

const initialState: DoctorsState = {
  all: [],
  load: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk("fetch/doctors", async () => {
  const res = await api.get("3d1c993c-cd8e-44c3-b1cb-585222859c21");
  return res.data;
});

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.load = false;
    });
    builder.addCase(fetchDoctors.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchDoctors.rejected, (state) => {
      state.error =
        "Ooops something went wrong fetching doctors... Try again later";
      state.load = false;
    });
  },
});

export default doctorsSlice.reducer;
