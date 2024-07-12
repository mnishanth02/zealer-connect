import { DynamicFormProps } from "./auth-constants";

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const ATHLETE_SETTINGS_TAB: TABS_MENU_PROPS[] = [
  {
    label: "personal",
  },
  {
    label: "athletic",
  },
  {
    label: "achievements",
  },
  {
    label: "settings",
  },
];

export const PERSONAL_FORM: DynamicFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your full name",
    name: "fullName",
    type: "text",
    row: 1,
    label: "Full Name",
    width: "w-1/2",
  },
  {
    id: "2",
    inputType: "date",
    placeholder: "Enter your date of birth",
    name: "dob",
    type: "date",
    row: 1,
    label: "Date of Birth",
    width: "w-1/2",
  },
  {
    id: "3",
    inputType: "select",
    placeholder: "Select gender",
    name: "gender",
    type: "text",
    row: 2,
    label: "Gender",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "Male",
        value: "male",
      },
      {
        id: "2",
        label: "Female",
        value: "female",
      },
      {
        id: "3",
        label: "Other",
        value: "other",
      },
    ],
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Your nationality",
    name: "nationality",
    type: "text",
    row: 2,
    label: "Nationality",
    width: "w-1/2",
  },
  {
    id: "5",
    inputType: "textarea",
    placeholder: "Tell us about yourself",
    name: "bio",
    type: "text",
    row: 4,
    label: "Biography",
    width: "w-full",
  },
];

export const ATHLETIC_FORM: DynamicFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "e.g., Running",
    name: "primarySport",
    type: "text",
    row: 1,
    label: "Primary Sport",
    width: "w-1/2",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "e.g., Marathon",
    name: "speciality",
    type: "text",
    row: 1,
    label: "Speciality",
    width: "w-1/2",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "e.g., 5",
    name: "experience",
    type: "text",
    row: 2,
    label: "Experience",
    width: "w-1/2",
  },
  {
    id: "4",
    inputType: "select",
    placeholder: "Select status",
    name: "proStatus",
    type: "text",
    row: 2,
    label: "Professional Status",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "Amateur",
        value: "amateur",
      },
      {
        id: "2",
        label: "Semi-Pro",
        value: "semiPro",
      },
      {
        id: "3",
        label: "Professional",
        value: "professional",
      },
    ],
  },
];
