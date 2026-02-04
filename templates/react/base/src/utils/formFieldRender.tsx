/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  ErrorMessage,
  Field,
  type FormikErrors,
  type FormikTouched,
} from "formik";
import Select from "react-select";
import type { IconType } from "react-icons";
import { Button, FormGroup, Label } from "reactstrap";
import { FiX } from "react-icons/fi";
import type { ISelectType } from "../types/common";
import { Editor } from "../components/reusables/Editor";

export type IFormRender = {
  field: FormField;
  colSize: string;
};

export type FormField<T extends HTMLElement = HTMLElement> = {
  id: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "textarea"
    | "multiSelect"
    | "datePicker"
    | "dateRange"
    | "button"
    | "checkbox"
    | "editor";
  buttonType?: "button" | "submit" | "reset" | undefined;
  label?: string;
  value?: any;
  placeholder?: string;
  options?: ISelectType[];
  onChange?: React.ChangeEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  onClick?: () => void;
  onDateChange?: (dates: DateObject | DateObject[] | null) => void;
  onSelectChange?: (value: ISelectType[]) => void;
  onEditorChange?: (value: string) => void;
  icon?: IconType;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "link";
  size?: "sm" | "lg" | undefined;
  className?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  format?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  showError?: boolean;
  readonly?: boolean;
  maxDate?: string | number | Date;
  minDate?: string | number | Date;
  invalid?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  clearable?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
};

export const renderFormField = (field: FormField): React.ReactElement => {
  const {
    id,
    type,
    label,
    value,
    placeholder,
    buttonType,
    options = [],
    onClick = () => {},
    onDateChange = () => {},
    onSelectChange = () => {},
    onEditorChange = () => {},
    icon: Icon,
    color = "primary",
    size = undefined,
    className = "",
    isMulti = false,
    isClearable = false,
    format = "MM/DD/YYYY",
    disabled = false,
    required = false,
    name,
    showError = true,
    readonly = false,
    maxDate,
    minDate,
    rows = 3,
    clearable = true,
    min,
    max,
    errors,
    touched,
  } = field;

  // const { errors, touched } = useFormikContext<any>();

  const renderLabel = () => {
    if (!label) return null;
    return (
      <Label htmlFor={id}>
        {label}
        {required && " *"}
      </Label>
    );
  };

  const renderError = () => {
    if (!name || !showError) return null;
    return <ErrorMessage name={name} component="p" className="text-danger" />;
  };

  switch (type) {
    case "text":
    case "password":
    case "email":
    case "number":
    case "textarea":
      return (
        <FormGroup key={id}>
          {renderLabel()}
          <Field
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            readOnly={readonly}
            className={`form-control ${className} ${
              touched?.name && errors?.name ? "is-invalid" : ""
            }`}
            {...(type === "number" ? { min, max } : {})}
            {...(type === "textarea" ? { rows, as: "textarea" } : {})}
          />
          {renderError()}
        </FormGroup>
      );

    case "checkbox":
      return (
        <FormGroup key={id}>
          <label>
            <Field type="checkbox" name={name} className="me-2" />
            {label}
          </label>
        </FormGroup>
      );

    case "multiSelect":
      return (
        <FormGroup key={id}>
          {renderLabel()}
          <Select
            inputId={id}
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={(values) => {
              if (!values) {
                onSelectChange([]);
                return;
              }
              const selected = Array.isArray(values) ? values : [values];
              onSelectChange(selected);
            }}
            placeholder={placeholder}
            className={className}
            isClearable={isClearable}
            isDisabled={disabled}
            required={required}
            menuPlacement="auto"
          />
          {renderError()}
        </FormGroup>
      );

    case "datePicker":
    case "dateRange":
      return (
        <FormGroup key={id}>
          {renderLabel()}
          <div className={`${className} position-relative`}>
            <DatePicker
              value={value}
              onChange={(dates: DateObject[]) => onDateChange(dates || [])}
              range={type === "dateRange"}
              placeholder={placeholder}
              format={format}
              name={name}
              disabled={disabled}
              readOnly={readonly}
              maxDate={maxDate ? new DateObject(maxDate) : undefined}
              minDate={minDate ? new DateObject(minDate) : undefined}
              editable={false}
            />
            {clearable && value && (
              <FiX
                className="text-secondary position-absolute cursor-pointer"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => onDateChange(null)}
              />
            )}
          </div>
          {renderError()}
        </FormGroup>
      );

    case "button":
      return (
        <Button
          key={id}
          id={id}
          color={color}
          type={buttonType}
          size={size}
          onClick={onClick}
          className={className}
          disabled={disabled}
          readOnly={readonly}
        >
          {Icon && <Icon className="ms-1" />}
          {label}
        </Button>
      );

    case "editor":
      return (
        <Editor
          key={id}
          content={value}
          setContent={onEditorChange}
          placeholder={placeholder}
        />
      );

    default:
      return <div key={id}>Unsupported field type: {type}</div>;
  }
};

// Utility function to render fields with custom column sizes
export const renderFieldRowWithSizes = (
  fieldsWithSizes: IFormRender[],
  className = "g-3",
): React.ReactElement => {
  return (
    <div
      className={`row ${className}`}
      key={fieldsWithSizes.map((f) => f.field.id).join("-")}
    >
      {fieldsWithSizes.map(({ field, colSize }) => (
        <div key={field.id} className={colSize}>
          {renderFormField(field)}
        </div>
      ))}
    </div>
  );
};
