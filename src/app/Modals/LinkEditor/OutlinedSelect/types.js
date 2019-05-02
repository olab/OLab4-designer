// @flow
export type IOutlinedSelectProps = {
  label: string;
  name: string;
  labelWidth: number;
  value: string;
  onChange: Function;
  values: Array<string>;
  classes: {
    [prop: string]: any;
  };
};
