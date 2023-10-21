export interface FormProps {
  onSubmit: (values: any, formikBag: any) => void | Promise<any>;
}

export interface FieldProps {
  name: string;
  label: string;
  id?: string;
  type?: string;
  [key: string]: any;
}
