import React, { FC, SetStateAction, Dispatch } from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IVacationDatePickerProps {
  type: string;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  setStartDate?: any;
  setEndDate?: any;
}

const VacationDatePicker: FC<IVacationDatePickerProps> = ({
  type,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) => {
  const handleChangeDate = (date: any) => {
    if (type === "Start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={`${type} date`}
        value={type === "Start" ? startDate : endDate}
        onChange={(newDate) => handleChangeDate(newDate)}
        renderInput={(params) => <TextField {...params} />}
        onError={(reason, value) => {
          console.log(reason);
          console.log(value);
        }}
      />
    </LocalizationProvider>
  );
};

export default VacationDatePicker;
