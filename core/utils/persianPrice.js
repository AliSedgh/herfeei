export const persianPrice = (value) => {
  const number = Number(value);
  return number.toLocaleString("fa-IR");
};
