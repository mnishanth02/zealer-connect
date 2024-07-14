/* eslint-disable no-unused-vars */
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import { Label } from "@ui/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/components/ui/select";
import { format, getDaysInMonth, isValid, setDate, setMonth, setYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, useWatch } from "react-hook-form";

type Props = {
  control: Control<any>;
  defaultValue?: string | boolean | Date | number;
  name: string;
  label?: string;
  renderErrorMessage: (name: string) => ReactNode | null;
};

export const useCalendar = ({ control, defaultValue, name, label, renderErrorMessage }: Props) => {
  const years = useMemo(() => Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i), []);
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const updateDate = useCallback((newDate: Date, onChange: (_: Date) => void) => {
    if (isValid(newDate)) {
      onChange(newDate);
    }
  }, []);

  const DatePicker = useCallback(() => {
    const selectedDate = useWatch({ control, name }) || new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate);

    const handleYearChange = (year: string) => {
      const newDate = setYear(currentMonth, parseInt(year));
      setCurrentMonth(newDate);
    };

    const handleMonthChange = (month: string) => {
      const newDate = setMonth(currentMonth, months.indexOf(month));
      setCurrentMonth(newDate);
    };

    const handleDayChange = (day: string, onChange: (_: Date) => void) => {
      const newDate = setDate(currentMonth, parseInt(day));
      updateDate(newDate, onChange);
      setCurrentMonth(newDate);
    };

    const getDaysForSelectedMonth = (selectedDate: Date) => {
      const daysInMonth = getDaysInMonth(selectedDate);
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    return (
      <div className="flex w-full flex-col space-y-2">
        {label && <Label>{label}</Label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto py-3" style={{ minWidth: "300px" }}>
                <div className="mb-4 flex justify-center space-x-2">
                  <Select onValueChange={handleYearChange} value={currentMonth.getFullYear().toString()}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={handleMonthChange} value={months[currentMonth.getMonth()]}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => handleDayChange(value, field.onChange)}
                    value={selectedDate.getDate().toString()}
                  >
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDaysForSelectedMonth(currentMonth).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(newDate) => {
                      if (newDate) {
                        updateDate(newDate, field.onChange);
                        setCurrentMonth(newDate);
                      }
                    }}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    initialFocus
                    className="rounded-md border-[0.5px]"
                  />
                </div>
              </PopoverContent>
            </Popover>
          )}
        />
        {renderErrorMessage(name)}
      </div>
    );
  }, [control, defaultValue, label, months, name, renderErrorMessage, updateDate, years]);

  return { DatePicker };
};
