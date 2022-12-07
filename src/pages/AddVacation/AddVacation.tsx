import React, { useState } from "react";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { VacationDatePicker } from "../../shared/DatePicker";
import { VacationSelector } from "../../shared/VacationSelector";
import { styledAddVacation } from "./style";

const AddVacation = () => {
  const [vacationType, setVacationType] = useState<string | null>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<string | null>();
  const [error, setError] = useState<string>("");

  const isFildesEmpty = startDate && endDate && vacationType;

  const addNewVacation = () => {
    if (!isFildesEmpty) return console.log("Error");
    console.log({ vacationType, endDate, startDate });
  };

  return (
    <>
      <Box sx={styledAddVacation.vacationWrapper}>
        <Box>
          <Box sx={styledAddVacation.datePickBlock}>
            <VacationSelector
              vacationType={vacationType}
              setVacationType={setVacationType}
            />
            <VacationDatePicker
              type="Start"
              startDate={startDate}
              setStartDate={setStartDate}
            />
            <VacationDatePicker
              type="End"
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </Box>
        </Box>
        <Box>
          <TextField
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ width: "400px" }}
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={8}
            defaultValue="Default Value"
          />
        </Box>
      </Box>
      <button onClick={addNewVacation}>Show</button>
    </>
  );
};

export default AddVacation;
