import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { VacationDatePicker } from "./DatePicker";
import { VacationSelector } from "./VacationSelector";
import { Layout } from "../../shared/Layout";
import { styledAddVacation } from "./style";

const AddVacation = () => {
  const [vacationType, setVacationType] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<string>("");
  const navigate = useNavigate();

  const isFieldsEmpty = startDate && endDate && vacationType;

  const addNewVacation = () => {
    if (!isFieldsEmpty) return console.log("Error");
    console.log({ vacationType, endDate, startDate });
  };

  return (
    <>
      <Layout title="Add" backButton={() => navigate(-1)} />
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
          />
        </Box>
      </Box>
      <button onClick={addNewVacation}>Show</button>
    </>
  );
};

export default AddVacation;
