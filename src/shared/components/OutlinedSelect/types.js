// @flow
export type IOutlinedSelectProps = {
  classes: {
    [prop: string]: any,
  },
  label: string,
  name: string,
  labelWidth: number,
  value: string,
  fullWidth: boolean,
  onChange: Function,
  values: Array<string>,
};
