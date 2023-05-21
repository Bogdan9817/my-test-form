import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../Form";
import { updateCities } from "../../store/slices/citiesSlice";
import { updateDoctorsDeps } from "../../store/slices/doctorsSlice";

const CitySelector = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<FormValues>>
>(({ onChange, name, label }, ref) => {
  const { filtered, deps } = useAppSelector((state) => state.cities);
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    const cityId = filtered.find((c) => c.id === e.target.value)?.id;
    onChange(e);
    dispatch(updateDoctorsDeps({ cityId }));
  };

  useEffect(() => {
    dispatch(updateCities());
  }, [deps, dispatch]);

  return (
    <>
      <label>{label}</label>
      <select
        name={name}
        defaultValue={filtered.length === 1 ? filtered[0].name : "none"}
        ref={ref}
        onChange={handleChange}
      >
        <option value=''>none</option>
        {filtered.map((c) => {
          return (
            <option key={`c-${c.id}`} value={c.id}>
              {c.name}
            </option>
          );
        })}
      </select>
    </>
  );
});

export default CitySelector;
