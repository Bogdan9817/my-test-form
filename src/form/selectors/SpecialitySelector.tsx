import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../Form";
import { updateDoctorsDeps } from "../../store/slices/doctorsSlice";
import { updateSpecialities } from "../../store/slices/specialitiesSlice";

const SpecialitySelector = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<FormValues>>
>(({ onChange, name, label }, ref) => {
  const { filtered, deps } = useAppSelector((state) => state.specialities);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    const specialityId = filtered.find((s) => s.id === e.target.value)?.id;
    dispatch(updateDoctorsDeps({ specialityId }));
    onChange(e);
  };

  useEffect(() => {
    dispatch(updateSpecialities());
  }, [deps, dispatch]);

  return (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={handleChange}>
        {filtered.length !== 1 && <option value=''>none</option>}
        {filtered.map((s) => {
          return (
            <option key={`s-${s.id}`} value={s.id}>
              {s.name}
            </option>
          );
        })}
      </select>
    </>
  );
});

export default SpecialitySelector;
