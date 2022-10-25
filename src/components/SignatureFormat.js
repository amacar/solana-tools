import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";

export const SignatureFormat = ({ sigFormat, onSigFormatChange }) => (
  <FormControl>
    <FormLabel>Signature format</FormLabel>
    <RadioGroup row value={sigFormat} onChange={onSigFormatChange}>
      <FormControlLabel value="byteArray" control={<Radio />} label="Byte Array" />
      <FormControlLabel value="hex" control={<Radio />} label="Hex" />
      <FormControlLabel value="base58" control={<Radio />} label="Base58" />
      <FormControlLabel value="base64" control={<Radio />} label="Base64" />
    </RadioGroup>
  </FormControl>
);
