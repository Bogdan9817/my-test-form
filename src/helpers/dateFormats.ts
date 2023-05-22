export const formatDate = (date: string) => {
  return date.split("-").reverse().join("/");
};

export const getAge = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  return `${Math.abs(new Date(diff).getFullYear() - 1970)}`;
};
