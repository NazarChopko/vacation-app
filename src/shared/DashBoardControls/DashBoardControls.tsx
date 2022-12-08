import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styledDashboard } from "./style";

const DashBoardControls: FC = () => {
  const navigate = useNavigate();

  const addNewVacation = (): void => {
    navigate("/user/vacation", { replace: true });
  };

  return (
    <Box sx={styledDashboard.dashboardWrapper}>
      <Box sx={styledDashboard.addContainer}>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button>Actual</Button>
          <Button>History</Button>
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
        <Button variant="outlined">Table</Button>
      </Box>
    </Box>
  );
};

export default DashBoardControls;
