import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const CustomTableHeader = () => {
  return (
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
  );
};

export default CustomTableHeader;
