// @flow
export type IOutlinedInputProps = {
  classes: {
    [prop: string]: any,
  },
  name: string,
  label: string | null,
  value: string,
  placeholder: string,
  onChange: Function,
  fullWidth: boolean,
  disabled: boolean,
};
