import { TextField } from "@mui/material";

const style = { marginBottom: "15px", width: "100%" };

export const CustomTextField = ({ label, value, setValue, multiline = false, ...props }) => (
  <TextField
    {...props}
    multiline={multiline}
    value={value}
    style={style}
    label={label}
    variant="outlined"
    onChange={(e) => setValue(e.target.value)}
  />
);
