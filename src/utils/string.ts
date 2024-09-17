export const hasNumber = (value: string) => {
  const floatNumber = parseFloat(value);

  return typeof floatNumber === 'number' && !isNaN(floatNumber);
};