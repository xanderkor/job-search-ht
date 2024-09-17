export const hasNumber = (value: string) => {
  const floatNumber = Number(value);

  return typeof floatNumber === 'number' && !isNaN(floatNumber);
};