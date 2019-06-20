// @flow
export type IOutlinedInputProps = {
  name: string;
  label: string | null;
  value: string;
  placeholder: string;
  onChange: Function;
  fullWidth: boolean;
  classes: {
    [prop: string]: any;
  };
};
