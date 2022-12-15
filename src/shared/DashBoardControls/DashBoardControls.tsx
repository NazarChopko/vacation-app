import React, { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styledDashboard } from "./style";
import { UserData } from "../../context/UserDataContext";

const DashBoardControls: FC = () => {
  const navigate = useNavigate();
  const { setFilterType, setIsCalendarVisible, isCalendarVisible } =
    useContext(UserData);
  const [isActiveActual, setIsActiveActual] = useState<boolean>(true);

  const addNewVacation = (): void => {
    navigate("/vacation");
  };

  return (
    <Box sx={styledDashboard.dashboardWrapper}>
      <Box sx={styledDashboard.addContainer}>
        <ButtonGroup disableElevation aria-label="Disabled elevation buttons">
          <Button
            variant={isActiveActual ? "contained" : "outlined"}
            onClick={() => {
              setIsActiveActual(!isActiveActual);
              setFilterType("actual");
            }}
          >
            Actual
          </Button>
          <Button
            variant={isActiveActual ? "outlined" : "contained"}
            onClick={() => {
              setIsActiveActual(!isActiveActual);
              setFilterType("history");
            }}
          >
            History
          </Button>
        </ButtonGroup>
        <Button
          onClick={addNewVacation}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add new request
        </Button>
      </Box>
      <Box sx={{ paddingRight: "60px" }}>
        <Button
          onClick={() => setIsCalendarVisible((prev) => !prev)}
          variant="contained"
        >
          {isCalendarVisible ? "Table" : "Calendar"}
        </Button>
      </Box>
    </Box>
  );
};

export default DashBoardControls;
