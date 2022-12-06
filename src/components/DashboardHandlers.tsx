import React from "react";
import { handleBackButton, editTitle } from "../redux/slices/controlSlice";
import { useCustomDispatch } from "../redux/hooks/customDispatch";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const DashboardHandlers = () => {
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const addNewVacation = () => {
    dispatch(handleBackButton(true));
    dispatch(editTitle("Add vacation"));
    navigate("/user/vacation", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: "60px",
      }}
    >
      <Box
        sx={{ display: "flex", width: "50%", justifyContent: "space-around" }}
      >
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

export default DashboardHandlers;
