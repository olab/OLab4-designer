// @flow
export type ISliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: Function;
  classes: {
    [prop: string]: any;
  };
};
