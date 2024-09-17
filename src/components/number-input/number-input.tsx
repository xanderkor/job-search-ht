import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { hasNumber } from "../../utils/string";

export type NumberInputProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string, processedValue: number) => void;
  positiveOnly?: boolean;
};

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { positiveOnly, onChange, ...restProps } = props;

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = Number(value);

    if (positiveOnly && numberValue < 0) {
      return;
    }

    if (hasNumber(value)) {
      onChange(value, numberValue);
    }
  }, [positiveOnly, onChange]);

  return (
    <TextField 
      // size="small"
      {...restProps}
      onChange={handleChange}
    />
  );
};