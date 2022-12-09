import Box from "@mui/material/Box";
import { FC } from "react";
import { DashBoardControls } from "../../shared/DashBoardControls";
import { Layout } from "../../shared/Layout";
import { VacationTable } from "../../shared/VacationTable";

const DashBoard: FC = () => {
  return (
    <Box sx={{ width: "100%%", margin: "0 auto" }}>
      <Layout title={"Dashboard"} />
      <Box sx={{ padding: "0px 40px" }}>
        <DashBoardControls />
        <VacationTable />
      </Box>
    </Box>
  );
};

export default DashBoard;
