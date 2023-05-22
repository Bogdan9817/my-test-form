import { useEffect, useState } from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSpecialities } from "../store/slices/specialitiesSlice";
import { fetchDoctors } from "../store/slices/doctorsSlice";
import { fetchCities } from "../store/slices/citiesSlice";

import SpecialitySelector from "./selectors/SpecialitySelector";
import CitySelector from "./selectors/CitySelector";
import DoctorSelector from "./selectors/DoctorSelector";
import SexSelector from "./selectors/SexSelector";

import NameInput from "./inputs/NameInput";
import BirthdayInput from "./inputs/BirthdayInput";
import ContactInput from "./inputs/ContactInput";
import FullfilledBlank from "./FullfilledBlank";

import { formatDate } from "../helpers/dateFormats";

import "./styles/styles.scss";

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

export type InputProps = {
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  setError?: UseFormSetError<FormValues>;
  error?: FieldError;
};

export default function Form() {
  const [submitted, setSubmitted] = useState<FormValues | null>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const { doctors, cities, specialities } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchDoctors());
    dispatch(fetchSpecialities());
  }, [dispatch]);

  const submit = (data: FormValues) => {
    if (new Date(data["birthday-date"]) > new Date()) {
      return setError("birthday-date", { message: "Incorrect date" });
    }
    if (!data.doctor) {
      setError("doctor", { message: "Doctor is required" });
      setError("city", { message: "City is required" });
      return;
    }
    if (data.doctor) {
      const doc = doctors.all.find((d) => d.id === data.doctor);
      data.doctor = `${doc?.name} ${doc?.surname}`;
      data.city =
        cities.all.find((c) => c.id === doc?.cityId)?.name || data.city;
      data.speciality =
        specialities.all.find((s) => s.id === doc?.specialityId)?.name ||
        data.speciality;
    }
    data["birthday-date"] = formatDate(data["birthday-date"]);
    alert("Form submitted");
    console.log(data);
    setSubmitted(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <NameInput
          register={register}
          setValue={setValue}
          error={errors.name}
        />
        <BirthdayInput
          register={register}
          setValue={setValue}
          error={errors["birthday-date"]}
        />
        <SexSelector
          register={register}
          setValue={setValue}
          error={errors.sex}
        />
        <ContactInput
          label='email'
          dependency='phone'
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <ContactInput
          label='phone'
          dependency='email'
          register={register}
          setValue={setValue}
          watch={watch}
        />
        {errors.phone && errors.email && (
          <p className='error'>
            {errors.phone?.message || errors.email?.message}
          </p>
        )}
        {doctors.load && cities.load && specialities.load && (
          <div className='loader'>Load doctors</div>
        )}
        {cities.error && <p className='error'>{cities.error}</p>}
        {specialities.error && <p className='error'>{specialities.error}</p>}
        {doctors.error && <p className='error'>{doctors.error}</p>}
        {!doctors.load &&
          !cities.load &&
          !specialities.load &&
          !doctors.error &&
          !cities.error &&
          !specialities.error && (
            <>
              <CitySelector
                register={register}
                setValue={setValue}
                error={errors.city}
                dependency={!watch().doctor}
              />
              <SpecialitySelector
                register={register}
                setValue={setValue}
                error={errors.speciality}
              />
              <DoctorSelector
                register={register}
                setValue={setValue}
                error={errors.doctor}
              />
              <input type='submit' />
            </>
          )}
      </form>
      {submitted && <FullfilledBlank person={submitted} />}
    </>
  );
}
