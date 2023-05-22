import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { Sex } from "./personSlice";

type Speciality = {
  id: string;
  name: string;
  params?: {
    gender?: Sex;
    minAge?: number;
    maxAge?: number;
  };
};

type SpecialitiesState = {
  all: Speciality[];
  load: boolean;
  error: string | null;
};

const initialState: SpecialitiesState = {
  all: [],
  load: false,
  error: null,
};

export const fetchSpecialities = createAsyncThunk(
  "fetch/specialities",
  async () => {
    const res = await api.get("e8897b19-46a0-4124-8454-0938225ee9ca");
    return res.data;
  }
);

export const specialitiesSlice = createSlice({
  name: "specialities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpecialities.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.load = false;
    });
    builder.addCase(fetchSpecialities.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchSpecialities.rejected, (state) => {
      state.error =
        "Ooops... something went wrong fetching specialities... Try again later";
      state.load = false;
    });
  },
});

export default specialitiesSlice.reducer;
