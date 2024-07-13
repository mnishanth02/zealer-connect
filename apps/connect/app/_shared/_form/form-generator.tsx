"use client";

import { useCallback } from "react";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@ui/components/ui/select";
import { Switch } from "@ui/components/ui/switch";
import { Textarea } from "@ui/components/ui/textarea";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

import { useCalendar } from "../hooks/useCalendar";

type Props = {
  type: "text" | "email" | "password" | "date" | "radio" | "switch" | "number" | "tel" | "url" | "time";
  inputType: "select" | "input" | "textarea" | "radio" | "switch" | "date" | "number" | "tel" | "url" | "time";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  control: Control<any>;
  placeholder: string;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string | boolean | Date | number;
  switchDescription?: string;
  min?: number;
  max?: number;
  step?: number;
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  type,
  form,
  control,
  label,
  lines,
  options,
  switchDescription,
  min,
  max,
  step,
}: Props) => {
  const renderErrorMessage = useCallback(
    (fieldName: string) => {
      const error = errors[fieldName];
      if (error && typeof error === "object" && "message" in error) {
        const message = error.message;
        if (typeof message === "string" && message !== "Required") {
          return <p className="text-destructive text-sm">{message}</p>;
        }
      }
      return null;
    },
    [errors]
  );
  const { DatePicker } = useCalendar({ control, defaultValue, name, label, renderErrorMessage });

  switch (inputType) {
    case "input":
    case "number":
    case "tel":
    case "url":
    case "time":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && <Label>{label}</Label>}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Input
                {...field}
                id={`input-${label || name}`}
                type={type}
                placeholder={placeholder}
                form={form}
                min={min}
                max={max}
                step={step}
              />
            )}
          />
          {renderErrorMessage(name)}
        </Label>
      );
    case "select":
      return (
        <Label htmlFor={`select-${label}`}>
          {label && <Label>{label}</Label>}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options?.length &&
                      options.map((option) => (
                        <SelectItem value={option.value} key={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {renderErrorMessage(name)}
        </Label>
      );
    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && <Label>{label}</Label>}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Textarea {...field} id={`input-${label}`} placeholder={placeholder} form={form} rows={lines} />
            )}
          />
          {renderErrorMessage(name)}
        </Label>
      );
    case "radio":
      return (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
              {label && <Label>{label}</Label>}
              {options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.id} />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      );
    case "switch":
      return (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Controller
              name={name}
              control={control}
              defaultValue={defaultValue as boolean}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} id={`switch-${name}`} />
              )}
            />
            <Label htmlFor={`switch-${name}`}>{label}</Label>
          </div>
          {switchDescription && <p className="text-sm text-gray-500">{switchDescription}</p>}
          {renderErrorMessage(name)}
        </div>
      );
    case "date":
      return <DatePicker />;
    default:
      return null;
  }
};

export default FormGenerator;
