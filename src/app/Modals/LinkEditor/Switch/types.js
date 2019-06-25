// @flow
export type ISwitchProps = {
  name: string;
  label: string;
  labelPlacement: string;
  checked: boolean;
  onChange: Function;
  classes: {
    [prop: string]: any;
  };
};
