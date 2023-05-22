import { useAppDispatch } from "../../store/hooks";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";
import patterns from "../patterns";

const NameInput = ({ register, setValue, error }: InputProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className='form-group'>
        <label>Name</label>
        <input
          placeholder='fill the name field'
          type='text'
          {...register("name", {
            required: "This is required",
            pattern: patterns.name,
            onChange(e) {
              dispatch(updateValue({ name: e.target.value }));
              setValue("name", e.target.value);
            },
          })}
        />
      </div>
      {error && <p className='error'>{error.message}</p>}
    </>
  );
};

export default NameInput;
