import React, { FC } from "react";
import { TableBody, TableRow, TableCell, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IDataVacation } from "../../../../context/UserDataContext";

interface ICustomTableBodyProps {
  page: number;
  rowsPerPage: number;
  info: IDataVacation[];
  deleteVacation: (id: string) => void;
}

const CustomTableBody: FC<ICustomTableBodyProps> = ({
  page,
  rowsPerPage,
  info,
  deleteVacation,
}) => {
  const navigate = useNavigate();

  const vacationNotesLengthRender = (notes: string): string => {
    return notes.length < 50 ? notes : notes.slice(0, 50) + "...";
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - info.length) : 0;
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? info.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : info
      ).map((vacationInfo: IDataVacation) => (
        <TableRow key={vacationInfo.id}>
          <TableCell component="th" scope="row">
            {vacationInfo?.id.slice(0, 4)}
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

export default CustomTableBody;
