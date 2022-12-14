import React, { FC, SetStateAction, Dispatch } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IVacationDatePickerProps {
  type: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  setEndDate: Dispatch<SetStateAction<Dayjs | null>>;
}

const VacationDatePicker: FC<IVacationDatePickerProps> = ({
  type,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) => {
  const handleChangeDate = (date: Dayjs | null) => {
    if (date) {
      if (type === "Start") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={`${type} date`}
        value={type === "Start" ? startDate : endDate}
        onChange={(newDate: Dayjs | null) => handleChangeDate(newDate)}
        renderInput={(params) => <TextField {...params} />}
        disablePast
        minDate={startDate && type === "End" ? dayjs(startDate) : dayjs()}
        maxDate={endDate && type === "Start" ? dayjs(endDate) : undefined}
      />
    </LocalizationProvider>
  );
};

export default VacationDatePicker;
