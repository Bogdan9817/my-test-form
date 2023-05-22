import { FormValues } from "./Form";

const FullfilledBlank = ({ person }: { person: FormValues }) => {
  return (
    <div className='fullfilled-blank'>
      {Object.keys(person).map((p, idx) => {
        return (
          <div className='blank-item' key={p}>
            <span>{p}: </span>
            <span>{Object.values(person)[idx]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FullfilledBlank;
