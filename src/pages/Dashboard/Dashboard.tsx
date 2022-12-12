import Box from "@mui/material/Box";
import { FC, useContext, useState } from "react";
import { UserData } from "../../context/UserDataContext";
import { Calendar } from "../../shared/Calendar";
import { DashBoardControls } from "../../shared/DashBoardControls";
import { Layout } from "../../shared/Layout";
import { VacationTable } from "../../shared/VacationTable";

const DashBoard: FC = () => {
  const { renderCalendar } = useContext(UserData);

  return (
    <Box sx={{ width: "100%%", margin: "0 auto" }}>
      <Layout title={"Dashboard"} />
      <Box sx={{ padding: "0px 40px" }}>
        <DashBoardControls />
        {renderCalendar ? <Calendar /> : <VacationTable />}
      </Box>
    </Box>
  );
};

export default DashBoard;
