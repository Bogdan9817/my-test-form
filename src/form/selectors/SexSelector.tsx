import { useAppDispatch } from "../../store/hooks";
import { updateValue } from "../../store/slices/personSlice";
import { InputProps } from "../Form";

const SexSelector = ({ register, setValue, error }: InputProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='form-group'>
        <label>Sex</label>
        <select
          {...register("sex", {
            required: "Please select sex",
            onChange(e) {
              dispatch(updateValue({ doctor: undefined }));
              dispatch(updateValue({ sex: e.target.value }));
              setValue("sex", e.target.value);
            },
          })}
        >
          <option value=''>none</option>
          <option value='Male'>male</option>
          <option value='Female'>female</option>
        </select>
      </div>
      {error && <p className='error'>{error.message}</p>}
    </>
  );
};

export default SexSelector;
