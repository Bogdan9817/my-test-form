import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

type City = {
  id: string;
  name: string;
};

type CitiesDeps = {
  doctorLoc?: string | undefined;
};

type CitiesState = {
  all: City[];
  filtered: City[];
  load: boolean;
  error: string | null;
  deps: CitiesDeps;
};

const initialState: CitiesState = {
  all: [],
  filtered: [],
  load: false,
  error: null,
  deps: {},
};

export const fetchCities = createAsyncThunk("fetch/cities", async () => {
  const res = await api.get("9fcb58ca-d3dd-424b-873b-dd3c76f000f4");
  return res.data;
});

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    updateCities: (state) => {
      if (state.deps?.doctorLoc) {
        state.filtered = state.all.filter(
          (c) => c.id === state.deps?.doctorLoc
        );
      } else {
        state.filtered = state.all;
      }
    },
    updateCitiesDeps: (state, { payload }: { payload: CitiesDeps }) => {
      state.deps = { ...state.deps, ...payload };
    },
    resetCitiesDeps: (state) => {
      state.deps = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCities.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.filtered = payload;
      state.load = false;
    });
    builder.addCase(fetchCities.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchCities.rejected, (state) => {
      state.error = "Ooops, something went wrong... Try again later";
      state.load = false;
    });
  },
});

export const { updateCities, updateCitiesDeps, resetCitiesDeps } =
  citiesSlice.actions;

export default citiesSlice.reducer;
