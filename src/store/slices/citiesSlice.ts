import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

type City = {
  id: string;
  name: string;
};

type CitiesState = {
  all: City[];
  load: boolean;
  error: string | null;
};

const initialState: CitiesState = {
  all: [],
  load: false,
  error: null,
};

export const fetchCities = createAsyncThunk("fetch/cities", async () => {
  const res = await api.get("9fcb58ca-d3dd-424b-873b-dd3c76f000f4");
  return res.data;
});

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCities.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.load = false;
    });
    builder.addCase(fetchCities.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchCities.rejected, (state) => {
      state.error =
        "Ooops, something went wrong fetching cities... Try again later";
      state.load = false;
    });
  },
});

export default citiesSlice.reducer;
