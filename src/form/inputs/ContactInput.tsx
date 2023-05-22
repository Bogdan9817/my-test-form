import { UseFormWatch } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { updateValue } from "../../store/slices/personSlice";
import { FormValues, InputProps } from "../Form";
import patterns from "../patterns";

type AdditionalContactProps = {
  dependency: keyof FormValues;
  label: keyof FormValues;
  watch: UseFormWatch<FormValues>;
};

const ContactInput = ({
  register,
  setValue,
  dependency,
  watch,
  label,
}: InputProps & AdditionalContactProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className='form-group'>
      <label>{label}</label>
      <input
        placeholder={`fill ${label} or ${dependency}`}
        type='text'
        {...register(label, {
          required: {
            value: !watch()[dependency],
            message: "Please fill email or phone",
          },
          // @ts-ignore
          pattern: patterns[label],
          onChange(e) {
            dispatch(updateValue({ [label]: e.target.value }));
            setValue(label, e.target.value);
          },
        })}
      />
    </div>
  );
};

export default ContactInput;
