import { DynamicFormProps, TABS_MENU_PROPS } from "./type";

export const ATHLETE_SETTINGS_TAB: TABS_MENU_PROPS[] = [
  {
    label: "personal",
  },
  {
    label: "athletic",
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
    inputType: "input",
    placeholder: "example@zealer.in",
    name: "email",
    type: "email",
    row: 3,
    label: "Email",
    width: "w-1/2",
  },
  {
    id: "6",
    type: "tel",
    inputType: "input",
    placeholder: "+91 123 456 7890",
    name: "phone",
    row: 3,
    label: "Phone Number",
    width: "w-1/2",
  },
  {
    id: "6",
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
    inputType: "select",
    placeholder: " Select primary sport",
    name: "primarySport",
    type: "text",
    row: 1,
    label: "Primary Sport",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "Running",
        value: "running",
      },
      {
        id: "2",
        label: "Trekking",
        value: "trekking",
      },
      {
        id: "3",
        label: "Cycling",
        value: "cycling",
      },
      {
        id: "4",
        label: "Swimming",
        value: "swimming",
      },
      {
        id: "5",
        label: "Other",
        value: "other",
      },
    ],
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "e.g., 5",
    name: "experience",
    type: "text",
    row: 1,
    label: "Experience",
    width: "w-1/2",
  },

  {
    id: "3",
    inputType: "input",
    placeholder: "e.g., Marathon",
    name: "speciality",
    type: "text",
    row: 2,
    label: "Speciality",
    width: "w-1/2",
  },

  {
    id: "4",
    inputType: "select",
    placeholder: "Select training frequency",
    name: "trainingFrequency",
    type: "text",
    row: 2,
    label: "Training Frequency",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "1-2 times per week",
        value: "1-2",
      },
      {
        id: "2",
        label: "3-4 times per week",
        value: "3-4",
      },
      {
        id: "3",
        label: "5+ times per week",
        value: "5+",
      },
    ],
  },
  {
    id: "5",
    inputType: "textarea",
    placeholder: "Goals for your next year",
    name: "goals",
    type: "text",
    row: 3,
    label: "Athlete Goals",
    width: "w-full",
  },
];

export const SETTINGS_FORM: DynamicFormProps[] = [
  {
    id: "1",
    inputType: "select",
    placeholder: "Select visibility",
    name: "visibility",
    type: "text",
    row: 1,
    label: "Profile Visibility",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "Public",
        value: "public",
      },
      {
        id: "2",
        label: "Private",
        value: "private",
      },
      {
        id: "3",
        label: "Registered users only",
        value: "registered users only",
      },
    ],
  },
  {
    id: "2",
    inputType: "select",
    placeholder: "Select preferred units",
    name: "preferredUnits",
    type: "text",
    row: 1,
    label: "Preferred Units",
    width: "w-1/2",
    options: [
      {
        id: "1",
        label: "Metric (km, kg)",
        value: "metric",
      },
      {
        id: "2",
        label: "Imperial (miles, lbs)",
        value: "imperial",
      },
      {
        id: "3",
        label: "Registered users only",
        value: "registered users only",
      },
    ],
  },

  {
    id: "3",
    inputType: "switch",
    placeholder: "enable Notification",
    name: "enableEmailNotify",
    type: "switch",
    row: 2,
    label: "Enable Email Notification",
    switchDescription: "",
    width: "w-1/2",
  },

  {
    id: "3",
    inputType: "switch",
    placeholder: "enable activity tracking",
    name: "allowActivityTrack",
    type: "switch",
    row: 3,
    label: "Allow activity tracking",
    switchDescription: "",
    width: "w-1/2",
  },
];
