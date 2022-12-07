import Box from "@mui/material/Box";
import { FC } from "react";
import { DashboardHandlers } from "../../shared/DashboardHandlers";
import { ILayoutProps } from "../../shared/Layout/Layout";
import { Table } from "../../shared/Table";

export type DashboardProps = Pick<ILayoutProps, "setTitle" | "setIsBackButton">;

const DashboardPage: FC<DashboardProps> = ({ setTitle, setIsBackButton }) => {
  return (
    <Box sx={{ width: "90%", margin: "0 auto", marginTop: "50px" }}>
      <DashboardHandlers
        setIsBackButton={setIsBackButton}
        setTitle={setTitle}
      />
      <Table />
    </Box>
  );
};

export default DashboardPage;
