import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { doctorsSelector } from "../../store/selectors";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";

const DoctorSelector = ({ register, setValue, error }: InputProps) => {
  const { all, alert } = useAppSelector(doctorsSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {!alert && all.length && (
        <div className='form-group'>
          <label>Doctors</label>
          <select
            {...register("doctor", {
              required: "Please select doctor",
              onChange(e) {
                dispatch(updateValue({ doctor: e.target.value }));
                setValue("doctor", e.target.value);
              },
            })}
          >
            <option value=''>none</option>
            {all.map((d) => {
              return (
                <option key={`d-${d.id}`} value={d.id}>
                  {`${d.name} ${d?.surname || ""}`}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {error && !alert && <p className='error'>{error.message}</p>}
      {alert && !error && <p className='alert'>{alert}</p>}
    </>
  );
};

export default DoctorSelector;
