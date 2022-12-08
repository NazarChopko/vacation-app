import React, { FC, SetStateAction, Dispatch } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IVacationSelectorProps {
  vacationType: string;
  setVacationType: Dispatch<SetStateAction<string>>;
}

const VacationSelector: FC<IVacationSelectorProps> = ({
  vacationType,
  setVacationType,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setVacationType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          name="type"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vacationType}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"own"}>Year's vacation</MenuItem>
          <MenuItem value={"money"}>For money</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default VacationSelector;
