export const IntegerValidation = {
  onChange: (input: string): string => {
    return input.replace(/\D/g, "");
  },
  onDone: (input: string): number => {
    return parseInt(input);
  },
};
