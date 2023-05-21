import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../Form";
import { updateCitiesDeps } from "../../store/slices/citiesSlice";
import { updateDoctors } from "../../store/slices/doctorsSlice";
import { updateSpecialitiesDeps } from "../../store/slices/specialitiesSlice";

const DoctorSelector = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<FormValues>>
>(({ onChange, name, label }, ref) => {
  const { filtered, deps, error } = useAppSelector((state) => state.doctors);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const d = filtered.find((d) => d.id === e.target.value);
    onChange(e);
    dispatch(updateCitiesDeps({ doctorLoc: d?.cityId }));
    dispatch(updateSpecialitiesDeps({ doctorSpec: d?.specialityId }));
  };

  useEffect(() => {
    dispatch(updateDoctors());
  }, [deps, dispatch]);

  return (
    <>
      {error && <p>{error}</p>}

      {!error && filtered.length && (
        <>
          <label>{label}</label>
          <select
            name={name}
            defaultValue={filtered.length === 1 ? filtered[0].name : "none"}
            ref={ref}
            onChange={handleChange}
          >
            <option value=''>none</option>
            {filtered.map((d) => {
              return (
                <option key={`d-${d.id}`} value={d.id}>
                  {`${d.name} ${d?.surname || ""}`}
                </option>
              );
            })}
          </select>
        </>
      )}
    </>
  );
});

export default DoctorSelector;
