import React, { useState, useContext, useEffect } from "react";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { VacationDatePicker } from "./DatePicker";
import { VacationSelector } from "./VacationSelector";
import { Layout } from "../../shared/Layout";
import { styledAddVacation } from "./style";
import { IDataVacation, UserData } from "../../context/UserDataContext";
import { useAuth } from "../../hooks/useAuth";

const AddVacation = () => {
  const [vacationType, setVacationType] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState<string>("");
  const navigate = useNavigate();
  const { data, setData, edit, setEdit } = useContext(UserData);
  const { user } = useAuth();

  const isFieldsEmpty = startDate && endDate && vacationType;
  const setHeaderTitle: string = !edit ? "Add vacation" : "Edit vacation";

  useEffect(() => {
    if (edit) {
      const editVacation = data.find((vacation) => vacation.id === edit);
      setVacationType(editVacation?.type as string);
      setNotes(editVacation?.notes as string);
      setStartDate(editVacation?.startDate as Dayjs);
      setEndDate(editVacation?.endDate as Dayjs);
    }
  }, [edit]);

  const newVacation = {
    id: uuidv4(),
    type: vacationType,
    startDate,
    endDate,
    notes,
  };
  const updateVacation = (
    type: string,
    id: string,
    note: string,
    firstDate: Dayjs | null,
    secondDate: Dayjs | null
  ) => {
    const getData = JSON.parse(localStorage.getItem("data") as string);
    const newEditVacation: IDataVacation[] = data.map((vacation) =>
      vacation.id === id
        ? {
            type,
            notes: note,
            id: edit,
            startDate: firstDate,
            endDate: secondDate,
          }
        : vacation
    );
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...getData,
        [user?.email as string]: [...newEditVacation],
      })
    );
    setData(newEditVacation);
    setEdit("");
  };

  const setNewVacation = () => {
    if (!edit) {
      const getData = JSON.parse(localStorage.getItem("data") as string);

      if (!getData) {
        localStorage.setItem(
          "data",
          JSON.stringify({ [user?.email as string]: [newVacation] })
        );
        setData((prev) => [newVacation, ...prev]);
        return navigate("/");
      }

      if (getData.hasOwnProperty(user?.email)) {
        localStorage.setItem(
          "data",
          JSON.stringify({
            ...getData,
            [user?.email as string]: [
              newVacation,
              ...getData[user?.email as string],
            ],
          })
        );
      } else {
        localStorage.setItem(
          "data",
          JSON.stringify({
            ...getData,
            [user?.email as string]: [newVacation],
          })
        );
      }
      setData((prev) => [newVacation, ...prev]);
      navigate("/");
    } else {
      updateVacation(vacationType, edit, notes, startDate, endDate);
      navigate("/");
    }
  };

  return (
    <>
      <Layout
        title={setHeaderTitle}
        backButton={() => {
          setEdit("");
          navigate(-1);
        }}
      />
      <Box sx={styledAddVacation.submitButton}>
        <Button
          onClick={setNewVacation}
          disabled={Boolean(!isFieldsEmpty)}
          variant="contained"
        >
          {setHeaderTitle}
        </Button>
      </Box>
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
    </>
  );
};

export default AddVacation;
