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

type DoctorsDeps = {
  cityId?: string;
  specialityId?: string;
  isPediatrician?: boolean;
};

export type DoctorsState = {
  all: Doctor[];
  filtered: Doctor[];
  load: boolean;
  error: string | null;
  deps: DoctorsDeps;
};

const initialState: DoctorsState = {
  all: [],
  filtered: [],
  load: false,
  error: null,
  deps: {},
};

export const fetchDoctors = createAsyncThunk("fetch/doctors", async () => {
  const res = await api.get("3d1c993c-cd8e-44c3-b1cb-585222859c21");
  return res.data;
});

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    updateDoctors: (state) => {
      const { all, deps } = state;
      if (Object.values(deps).every((v) => v === undefined)) {
      } else {
        state.filtered = all.filter((d) => {
          if (deps?.cityId && deps?.cityId !== d.cityId) return false;
          if (deps?.specialityId && deps.specialityId !== d.specialityId) {
            return false;
          }
          if (
            deps.isPediatrician !== undefined &&
            deps.isPediatrician !== d.isPediatrician
          ) {
            return false;
          }
          return true;
        });
        if (!state.filtered.length) {
          state.error = "Can`t find particular doctors";
        }
      }
    },
    updateDoctorsDeps: (state, { payload }) => {
      const key = Object.keys(payload)[0];
      const value = Object.values(payload)[0];
      state.deps = { ...state.deps, [key]: value };
      state.error = null;
    },
    resetDoctorsDeps: (state) => {
      state.deps = { isPediatrician: state.deps.isPediatrician };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.filtered = payload;
      state.load = false;
    });
    builder.addCase(fetchDoctors.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchDoctors.rejected, (state) => {
      state.error = "Ooops something went wrong";
      state.load = false;
    });
  },
});

export const { updateDoctors, updateDoctorsDeps, resetDoctorsDeps } =
  doctorsSlice.actions;

export default doctorsSlice.reducer;
