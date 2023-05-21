const patterns = {
  name: {
    value: /^[іІа-яА-Яa-zA-Z\s-]{3,16}$/,
    message:
      "Name should be between 3 - 16 symbols and do not contain anything except letters spaces or dashes",
  },
  email: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Not valid email",
  },
  phone: {
    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    message: "Not valid number",
  },
};

export default patterns;
