import { filterByAgeAndSex, isChild } from "../helpers/filters";
import { RootState } from "./store";

export const citiesSelector = ({ doctors, person, cities }: RootState) => {
  if (person.doctor) {
    const doc = doctors.all.find((d) => d.id === person.doctor);
    const filtered = cities.all.filter((c) => c.id === doc?.cityId);
    return filtered;
  }
  return cities.all;
};

export const doctorsSelector = ({
  doctors,
  person,
  specialities,
}: RootState) => {
  if (person.age || person.sex || person.city || person.speciality) {
    const filteredSpecs = filterByAgeAndSex(
      specialities.all,
      person.sex,
      person.age
    ).map((s) => s.id);
    const filtered = doctors.all.filter((d) => {
      if (!filteredSpecs.includes(d.specialityId)) return false;
      if (person.age && d.isPediatrician !== isChild(person.age)) return false;
      if (person.city && d.cityId !== person.city) return false;
      if (person.speciality && d.specialityId !== person.speciality) {
        return false;
      }
      return true;
    });

    return {
      all: filtered,
      alert: filtered.length === 0 ? "No doctors" : undefined,
    };
  }
  return { all: doctors.all, alert: undefined };
};

export const specialitiesSelector = ({
  doctors,
  person,
  specialities,
}: RootState) => {
  if (person.doctor) {
    const doc = doctors.all.find((d) => d.id === person.doctor);
    const filtered = specialities.all.filter(
      (spec) => spec.id === doc?.specialityId
    );
    return filtered;
  }
  if (person.sex || person.age) {
    const filtered = filterByAgeAndSex(
      specialities.all,
      person.sex,
      person.age
    );
    return filtered;
  }
  return specialities.all;
};
