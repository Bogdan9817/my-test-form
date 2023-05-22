import { Sex } from "../store/slices/personSlice";

export const filterByAgeAndSex = (
  arr: any[],
  sex: Sex | undefined,
  age: string | undefined
) => {
  return arr.filter((spec: any) => {
    if (sex && spec.params?.gender && sex !== spec.params.gender) {
      return false;
    }
    if (
      (age && spec.params?.maxAge && +age > spec.params.maxAge) ||
      (age && spec.params?.minAge && +age < spec.params.minAge)
    ) {
      return false;
    }
    return true;
  });
};

export const isChild = (age: string) => {
  return +age < 18;
};
