import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ state1, setState1, list }) => {
  const handleChange = (event) => {
    setState1(event.target.value);
  };

  return (
    <Box sx={{ width: 120, maxHeight: 60 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state1}
          onChange={handleChange}
        >
          {list.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
