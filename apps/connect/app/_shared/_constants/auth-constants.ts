import { DynamicFormProps } from "./type";

export const USER_REGISTRATION_FORM: DynamicFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Name",
    name: "name",
    type: "text",
    row: 1,
    width: "w-full",
  },

  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
    row: 2,
    width: "w-full",
  },

  {
    id: "3",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    row: 3,
    width: "w-full",
  },
  {
    id: "4",
    inputType: "select",
    placeholder: "Type",
    name: "role",
    type: "text",
    row: 4,
    width: "w-full",
    options: [
      {
        id: "1",
        label: "Register as Public",
        value: "public",
      },
      {
        id: "2",
        label: "Register as an Athlete",
        value: "athlete",
      },
      {
        id: "3",
        label: "Register as an Admin",
        value: "admin",
      },
    ],
  },
];

export const USER_LOGIN_FORM: DynamicFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
    row: 1,
    width: "w-full",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    row: 2,
    width: "w-full",
  },
];
