"use client";
import * as Yup from "yup";
import {
  Formik,
  Form as FormikForm,
  Field,
  useFormikContext,
  FieldProps as FormikFieldProps,
} from "formik";
import { clsx } from "clsx";

import Button from "../Button";

import styles from "./Form.module.css";
import TextField from "./TextField";
import SelectField from "./SelectField";
import { FieldProps } from "./Form.types";
import CheckboxField from "./CheckboxField/CheckboxField";
import TextEditorField from "./TextEditorField";
import TextAreaField from "./TextAreaField";

type value = string | number | boolean | Date;

interface FormProps {
  children: JSX.Element[] | JSX.Element | ((args: any) => JSX.Element);
  className?: string;
  initialValues: {
    [key: string]: value;
  };
  onSubmit: (
    values: { [key: string]: value },
    formikBag: any
  ) => void | Promise<any>;
  validationSchema: Yup.ObjectSchema<any>;
  loading?: boolean;
}

export default function Form({
  children,
  className,
  initialValues,
  onSubmit,
  validationSchema,
  ...props
}: FormProps) {
  const classNames = clsx({
    [styles.form]: true,
    ...(className && { [className]: true }),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(...args) => (
        <FormikForm className={classNames} noValidate {...props}>
          {typeof children === "function" ? children(...args) : children}
        </FormikForm>
      )}
    </Formik>
  );
}

const FormField = ({ name, label, type = "text", id, ...props }: any) => {
  const inputId = id ?? `field-${name}`;

  return (
    <Field name={name}>
      {({ field, form }: FormikFieldProps) => {
        if (type === "select" || type === "multiselect") {
          const handleChange = (value: string) => {
            form.setFieldValue(name, value);
          };

          return (
            <SelectField
              {...props}
              {...field}
              id={inputId}
              label={label}
              error={form.errors[field.name]}
              touched={form.touched[field.name]}
              onChange={handleChange}
              isMulti={type === "multiselect"}
            />
          );
        }

        if (type === "textarea") {
          return (
            <TextAreaField
              {...props}
              {...field}
              id={inputId}
              error={form.errors[field.name]}
              touched={form.touched[field.name]}
              label={label}
              // expandable
            />
          );
        }

        if (type === "checkbox") {
          return (
            <CheckboxField
              {...props}
              {...field}
              id={inputId}
              error={form.errors[field.name]}
              touched={form.touched[field.name]}
              label={label}
            />
          );
        }

        if (type === "richtext") {
          const handleChange = (value: string) => {
            form.setFieldValue(name, value);
          };
          return (
            <TextEditorField
              {...props}
              {...field}
              id={inputId}
              handleChange={handleChange}
              error={form.errors[field.name]}
              touched={form.touched[field.name]}
              label={label}
            />
          );
        }

        return (
          <TextField
            {...props}
            {...field}
            id={inputId}
            type={type}
            error={form.errors[field.name]}
            touched={form.touched[field.name]}
            label={label}
          />
        );
      }}
    </Field>
  );
};

Form.Field = FormField;

const FormSubmitButton = ({ ...props }) => {
  const { isSubmitting, errors } = useFormikContext();

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={styles.submit}
      loading={isSubmitting}
      {...props}
    />
  );
};

Form.Submit = FormSubmitButton;
