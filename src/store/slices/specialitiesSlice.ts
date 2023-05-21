import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

type Sex = "male" | "female";

type Speciality = {
  id: string;
  name: string;
  params?: {
    gender?: Sex;
    minAge?: number;
    maxAge?: number;
  };
};

type SpecialitiesDeps = {
  sex?: Sex;
  age?: number;
  doctorSpec?: string;
};

type SpecialitiesState = {
  all: Speciality[];
  filtered: Speciality[];
  load: boolean;
  error: string | null;
  deps: SpecialitiesDeps;
};

const initialState: SpecialitiesState = {
  all: [],
  filtered: [],
  load: false,
  error: null,
  deps: {},
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
  reducers: {
    updateSpecialities: (state) => {
      const { all, deps } = state;
      if (!Object.keys(deps).length) {
        state.filtered = all;
        return;
      }
      if (deps?.doctorSpec) {
        state.filtered = all.filter((s) => s.id === deps.doctorSpec);
        return;
      }
      state.filtered = all.filter((s) => {
        if (!s.params) return true;
        if (s.params.gender && deps.sex && s.params.gender !== deps.sex) {
          return false;
        }
        if (
          (s.params.maxAge && deps.age && s.params.maxAge < +deps.age) ||
          (s.params.minAge && deps.age && s.params.minAge > +deps.age)
        ) {
          return false;
        }
        return true;
      });
    },
    updateSpecialitiesDeps: (state, { payload }) => {
      const key = Object.keys(payload)[0];
      const value = Object.values(payload)[0] || undefined;
      state.deps = { ...state.deps, [key]: value };
    },
    resetSpecialitiesDeps: (state) => {
      state.deps = { ...state.deps, doctorSpec: undefined };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpecialities.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.filtered = payload;
      state.load = false;
    });
    builder.addCase(fetchSpecialities.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchSpecialities.rejected, (state) => {
      state.error = "Ooops... something went wrong... Try again later";
      state.load = false;
    });
  },
});

export const {
  updateSpecialities,
  updateSpecialitiesDeps,
  resetSpecialitiesDeps,
} = specialitiesSlice.actions;

export default specialitiesSlice.reducer;
