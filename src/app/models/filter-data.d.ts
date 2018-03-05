export interface FilterData {
  label: string;
  path: string;
  value: number;
  format: string;
  min: number;
  max: number;
  tolerance: number;
  checked: boolean;
  converter: Function;
}
