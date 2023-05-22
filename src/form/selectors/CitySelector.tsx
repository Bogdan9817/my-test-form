import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { citiesSelector } from "../../store/selectors";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";

const CitySelector = ({
  register,
  setValue,
  error,
  dependency,
}: InputProps & { dependency: boolean }) => {
  const cities = useAppSelector(citiesSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='form-group'>
        <label>City</label>
        <select
          {...register("city", {
            required: {
              value: dependency,
              message: "Please select city",
            },
            onChange(e) {
              dispatch(updateValue({ city: e.target.value }));
              setValue("city", e.target.value);
            },
          })}
        >
          {cities.length !== 1 && <option value=''>none</option>}
          {cities.map((c) => {
            return (
              <option key={`c-${c.id}`} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
      {error && <p className='error'>{error.message}</p>}
    </>
  );
};
export default CitySelector;
