import { getAge } from "../../helpers/dateFormats";
import { useAppDispatch } from "../../store/hooks";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";

const BirthdayInput = ({ register, setValue, error }: InputProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className='form-group'>
        <label>Birthday</label>
        <input
          type='date'
          {...register("birthday-date", {
            required: "This is required",
            onChange(e) {
              dispatch(updateValue({ doctor: undefined }));
              dispatch(updateValue({ age: getAge(e.target.value) }));
              setValue("birthday-date", e.target.value);
            },
          })}
        />
      </div>
      {error && <p className='error'>{error.message}</p>}
    </>
  );
};

export default BirthdayInput;
