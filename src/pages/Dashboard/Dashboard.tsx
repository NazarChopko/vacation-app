import Box from "@mui/material/Box";
import { FC } from "react";
import { DashBoardControls } from "../../shared/DashBoardControls";
import { Layout } from "../../shared/Layout";
import { VacationTable } from "../../shared/Table";

const DashBoard: FC = () => {
  return (
    <Box sx={{ width: "100%%", margin: "0 auto" }}>
      <Layout title={"Dashboard"} />
      <DashBoardControls />
      <VacationTable />
    </Box>
  );
};

export default DashBoard;
