type BaseFormProps = {
  id: string;
  placeholder: string;
  name: string;
  label?: string;
  row?: number;
  width?: string;
};

type TextInputProps = BaseFormProps & {
  type: "text" | "email" | "password" | "tel" | "url";
  inputType: "input";
};

type TextareaProps = BaseFormProps & {
  type: "text";
  inputType: "textarea";
};

type DateTimeProps = BaseFormProps & {
  type: "date" | "time";
  inputType: "date" | "time";
};

type RadioProps = BaseFormProps & {
  type: "radio";
  inputType: "radio";
};

type SelectProps = BaseFormProps & {
  type: "text";
  inputType: "select";
  options: { value: string; label: string; id: string }[];
};

type NumberProps = BaseFormProps & {
  type: "number";
  inputType: "number";
  min?: number;
  max?: number;
  step?: number;
};

type SwitchProps = BaseFormProps & {
  type: "switch";
  inputType: "switch";
  switchDescription: string;
};

export type DynamicFormProps =
  | TextInputProps
  | TextareaProps
  | DateTimeProps
  | RadioProps
  | SelectProps
  | NumberProps
  | SwitchProps;

// **************** General Type *****************
export type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};
