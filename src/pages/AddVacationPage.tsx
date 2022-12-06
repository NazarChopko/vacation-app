import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik, FormikProps } from "formik";
import { Dayjs } from "dayjs";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import VacationDatePicker from "../components/DatePicker";
import VacationSelector from "../components/VacationSelector";

// interface MyValues {
//   type: string;
//   start: string;
//   end: boolean | any;
// }

const AddVacation = () => {
  const [vacationType, setVacationType] = useState<string | null | undefined>(
    ""
  );
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [notes, setNotes] = useState<string | null>();
  const [error, setError] = useState<string>("");

  const isFildesEmpty = startDate && endDate && vacationType;

  const addNewVacation = () => {
    if (!isFildesEmpty) return console.log("Error");
    console.log({ vacationType, endDate, startDate });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "900px",
          height: "400px",
          margin: "0 auto",
          border: "2px solid black",
          borderRadius: "6px",
          padding: "20px",
          marginTop: "100px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
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
