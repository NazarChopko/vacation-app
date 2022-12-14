import React, { FC, useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { IDataVacation, UserData } from "../../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/useAuth";
import { Typography } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const getDataFromStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

const VacationTable: FC = () => {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [filtered, setFiltered] = React.useState<IDataVacation[]>([]);
  const { data, setData, filterType, setFilterType } = useContext(UserData);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const getVacationDataFromStorage = getDataFromStorage("data");
    const user = getDataFromStorage("user");
    if (user && getVacationDataFromStorage) {
      for (let key in getVacationDataFromStorage) {
        if (user.email === key) {
          setData(getVacationDataFromStorage[key]);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (filterType) {
      const today = dayjs().unix();
      if (filterType === "actual") {
        const actualVacation = data.filter(
          (vacation) => dayjs(vacation.endDate).unix() >= today
        );
        setFiltered(actualVacation);
      }
      if (filterType === "history") {
        const historyVacation = data.filter(
          (vacation) => dayjs(vacation.endDate).unix() < today
        );
        setFiltered(historyVacation);
      }
    }
  }, [filterType]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
    const getData = getDataFromStorage("data");
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
    setFilterType("");
    setData(newVacation);
  };

  const vacationNotesLengthRender = (notes: string): string => {
    return notes.length < 50 ? notes : notes.slice(0, 50) + "...";
  };

  const renderTableBody = (info: IDataVacation[]) => {
    return (
      <TableBody>
        {(rowsPerPage > 0
          ? info.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : info
        ).map((vacationInfo: IDataVacation) => (
          <TableRow key={vacationInfo.id}>
            <TableCell component="th" scope="row">
              {vacationInfo.id.slice(0, 4)}
            </TableCell>
            <TableCell align="center">{vacationInfo.type}</TableCell>
            <TableCell align="center">
              {dayjs(vacationInfo.startDate).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell align="center">
              {dayjs(vacationInfo.endDate).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell align="center">
              {vacationNotesLengthRender(vacationInfo.notes)}
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "20px",
                }}
              >
                <IconButton
                  onClick={() => navigate(`/vacation/${vacationInfo.id}`)}
                  sx={{ p: 1 }}
                >
                  <FormatAlignJustifyIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => deleteVacation(vacationInfo.id)}
                  sx={{ p: 1 }}
                >
                  <DeleteIcon sx={{ color: "grey" }} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
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

  return filterType ? (
    <>
      {filtered.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 900 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "100px" }} align="left">
                  Absect id
                </TableCell>
                <TableCell sx={{ width: "150" }} align="center">
                  Type
                </TableCell>
                <TableCell align="center">Start date</TableCell>
                <TableCell align="center">End date</TableCell>
                <TableCell sx={{ width: "500px" }} align="center">
                  Notes
                </TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {renderTableBody(filtered)}
            <TableFooter>
              <TableRow>
                {filtered.length < 6 ? null : (
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={filtered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        renderEmptyTable()
      )}
    </>
  ) : data.length ? (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "100px" }} align="left">
                Absect id
              </TableCell>
              <TableCell sx={{ width: "150" }} align="center">
                Type
              </TableCell>
              <TableCell align="center">Start date</TableCell>
              <TableCell align="center">End date</TableCell>
              <TableCell sx={{ width: "500px" }} align="center">
                Notes
              </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          {renderTableBody(data)}
          <TableFooter>
            <TableRow>
              {data.length < 6 ? null : (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  ) : (
    renderEmptyTable()
  );
};

export default VacationTable;
