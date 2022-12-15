import React, { FC, useContext } from "react";
import { Typography, Box, Table, TableContainer, Paper } from "@mui/material";
import { IDataVacation, UserData } from "../../../context/UserDataContext";
import { useAuth } from "../../../hooks/useAuth";
import { CustomTableBody } from "./CustomTableBody";
import { CustomTableFooter } from "./CustomTableFooter";
import { CustomTableHeader } from "./CustomTableHeader";

interface ICustomTableContainer {
  vacationData: IDataVacation[];
}

const CustomTableContainer: FC<ICustomTableContainer> = ({ vacationData }) => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const { data, setData } = useContext(UserData);
  const { user } = useAuth();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteVacation = (id: string) => {
    const getData = JSON.parse(localStorage.getItem("data") as string);
    const newVacation: IDataVacation[] = data.filter(
      (vacation) => vacation.id !== id
    );

    if (user) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          ...getData,
          [user.email as string]: [...newVacation],
        })
      );
    }
    setData(newVacation);
  };

  const renderEmptyTable = () => {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <Typography
          sx={(theme) => ({
            border: `1px solid ${theme.palette.primary.main} `,
            padding: "20px",
            borderRadius: "6px",
          })}
          color={"primary"}
          variant="h4"
        >
          Table is empty!
        </Typography>
      </Box>
    );
  };

  return vacationData.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="custom pagination table">
        <CustomTableHeader />
        <CustomTableBody
          page={page}
          rowsPerPage={rowsPerPage}
          info={vacationData}
          deleteVacation={deleteVacation}
        />
        <CustomTableFooter
          page={page}
          rowsPerPage={rowsPerPage}
          info={vacationData}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  ) : (
    renderEmptyTable()
  );
};

export default CustomTableContainer;
