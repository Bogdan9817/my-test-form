import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { specialitiesSelector } from "../../store/selectors";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";

const SpecialitySelector = ({ register, setValue, error }: InputProps) => {
  const specialities = useAppSelector(specialitiesSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='form-group'>
        <label>Speciality</label>
        <select
          {...register("speciality", {
            onChange(e) {
              dispatch(updateValue({ speciality: e.target.value }));
              setValue("speciality", e.target.value);
            },
          })}
        >
          {specialities.length !== 1 && <option value=''>none</option>}
          {specialities.map((s) => {
            return (
              <option key={`s-${s.id}`} value={s.id}>
                {s.name}
              </option>
            );
          })}
        </select>
      </div>

      {error && <p className='error'>{error.message}</p>}
    </>
  );
};
export default SpecialitySelector;
