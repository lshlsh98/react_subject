import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = ({ sta, setSta1, list }) => {
  const handleChange = (event) => {
    setSta1(event.target.value);
  };

  return (
    <Box sx={{ width: 100, maxHeight: 60 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sta}
          onChange={handleChange}
          sx={{ fontSize: "0.75rem", padding: "0px" }}
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
