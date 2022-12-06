import Box from "@mui/material/Box";
import DashboardHandlers from "../components/DashboardHandlers";
import Table from "../components/Table";

const DashboardPage = () => {
  return (
    <Box sx={{ width: "90%", margin: "0 auto", marginTop: "50px" }}>
      <DashboardHandlers />
      <Table />
    </Box>
  );
};

export default DashboardPage;
