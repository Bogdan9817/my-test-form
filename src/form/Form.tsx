import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import patterns from "./patterns";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCities, resetCitiesDeps } from "../store/slices/citiesSlice";
import {
  fetchDoctors,
  resetDoctorsDeps,
  updateDoctorsDeps,
} from "../store/slices/doctorsSlice";
import {
  fetchSpecialities,
  resetSpecialitiesDeps,
  updateSpecialitiesDeps,
} from "../store/slices/specialitiesSlice";
import SpecialitySelector from "./selectors/SpecialitySelector";
import CitySelector from "./selectors/CitySelector";
import DoctorSelector from "./selectors/DoctorSelector";
import { formatDate, getAge } from "./helpers";

export type FormValues = {
  name: string;
  sex: "male" | "female";
  phone?: string;
  email?: string;
  ["birthday-date"]: string;
  doctor: string;
  speciality: string;
  city: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const { cities, specialities, doctors } = useAppSelector((state) => state);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleTrigger = () => {
    setTrigger(!trigger);
    dispatch(resetCitiesDeps());
    dispatch(resetDoctorsDeps());
    dispatch(resetSpecialitiesDeps());
    setValue("city", "");
    setValue("doctor", "");
    setValue("speciality", "");
  };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchDoctors());
    dispatch(fetchSpecialities());
  }, [dispatch]);

  const submit = (data: FormValues) => {
    if (new Date(data["birthday-date"]) > new Date()) {
      return setError("birthday-date", { message: "Incorrect date" });
    }
    if (!data.doctor && !data.city) {
      setError("doctor", { message: "Doctor required" });
      setError("city", { message: "City required" });
      return;
    }
    if (data.doctor) {
      const doc = doctors.filtered.find((d) => data.doctor === d.id);
      data.doctor = `${doc?.name} ${doc?.surname}`;
      data.city = cities.all.find((c) => c.id === doc?.cityId)?.name || "";
      data.speciality =
        specialities.all.find((s) => s.id === doc?.specialityId)?.name || "";
    }
    data["birthday-date"] = formatDate(data["birthday-date"]);
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <input
        {...register("name", {
          required: "This is required",
          pattern: patterns.name,
        })}
      />
      <p>{errors.name?.message}</p>
      <input
        {...register("birthday-date", {
          required: "Please select birthday date",
          onChange(e) {
            setValue("birthday-date", e.target.value);
            setValue("doctor", "");
            const age = getAge(e.target.value);
            dispatch(updateSpecialitiesDeps({ age }));
            dispatch(updateDoctorsDeps({ isPediatrician: +age < 18 }));
          },
        })}
        type='date'
      />
      <p>{errors["birthday-date"]?.message}</p>
      <select
        {...register("sex", {
          required: "Please select sex",
          onChange(event) {
            setValue("sex", event.target.value);
            dispatch(updateSpecialitiesDeps({ sex: event.target.value }));
          },
        })}
      >
        <option value=''>none</option>
        <option value='Male'>male</option>
        <option value='Female'>female</option>
      </select>
      <p>{errors.sex?.message}</p>
      <input
        {...register("email", {
          required: {
            value: !watch().phone,
            message: "Please fill email or phone",
          },
          pattern: patterns.email,
        })}
      />
      <input
        {...register("phone", {
          required: {
            value: !watch().email,
            message: "Please fill email or phone",
          },
          pattern: patterns.phone,
        })}
      />
      <p>{errors.phone?.message || errors.email?.message}</p>
      <p onClick={handleTrigger}>
        Find doctor by: {trigger ? "city/speciality" : "name"}
      </p>
      {trigger ? (
        <>
          <CitySelector label='city' {...register("city")} />
          <p>{errors.city?.message}</p>
          {watch().city && (
            <SpecialitySelector
              label='speciality'
              {...register("speciality")}
            />
          )}
          {watch().city && (
            <DoctorSelector label='doctor' {...register("doctor")} />
          )}
          <p>{errors.doctor?.message}</p>
        </>
      ) : (
        <DoctorSelector label='doctor' {...register("doctor")} />
      )}
      <input type='submit' />
    </form>
  );
}
