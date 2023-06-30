import { useState } from "react";
import bs58 from "bs58";
import { Button, Alert, Snackbar } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { CustomTextField } from "./TextField";
import { SignatureFormat } from "./SignatureFormat";

const style = { marginBottom: "15px", width: "100%" };

export const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const [sigFormat, setSigFormat] = useState("byteArray");
  const [message, setMessage] = useState("signed message");
  const [signature, setSignature] = useState(null);
  const [shownSignature, setShownSignature] = useState("");
  const [error, setError] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const signMessageHandler = async () => {
    try {
      const encodedMessage = Buffer.from(message);
      setIsSigning(true);
      const sigArr = await signMessage(encodedMessage, "utf8");
      const sig = Buffer.from(sigArr).toJSON().data;
      setSignature(sig);
      setShownSig(sigFormat, sig);
      clearError();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSigning(false);
    }
  };

  const onSigFormatChange = (e) => {
    const signatureFormat = e.target.value;
    setSigFormat(signatureFormat);
    if (!signature) return;
    setShownSig(signatureFormat, signature);
  };

  const setShownSig = (format, sig) => {
    const signatureBytes = Buffer.from(sig);
    setShownSignature(getSignatureInFormat(format, signatureBytes));
  };

  const handleMessageChange = (msg) => {
    setMessage(msg);
    setSignature(null);
    clearError();
  };

  const clearError = () => setError("");

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={60000} message={error} onClose={clearError} />
      {!publicKey ? (
        <div>
          <WalletMultiButton style={style} />
          <Alert severity="error">Please connect to the wallet first!</Alert>
        </div>
      ) : (
        <>
          <CustomTextField multiline label="Message" value={message} setValue={handleMessageChange} />
          <CustomTextField disabled label="SOL Address" value={publicKey} />
          <Button
            style={{ ...style, marginBottom: "45px" }}
            variant="contained"
            disabled={!message || isSigning}
            onClick={signMessageHandler}
          >
            {isSigning ? "Confirm Sign Message..." : "Sign Message"}
          </Button>
          {signature && (
            <>
              <CustomTextField
                disabled
                multiline
                minRows={4}
                label="Signature"
                value={shownSignature}
                setValue={setSignature}
              />
              <SignatureFormat sigFormat={sigFormat} onSigFormatChange={onSigFormatChange} />
            </>
          )}
        </>
      )}
    </div>
  );
};

const getSignatureInFormat = (sigFormat, signature) => {
  switch (sigFormat) {
    case "base58":
      return bs58.encode(signature);
    case "base64":
      return signature.toString("base64");
    case "hex":
      return `0x${signature.toString("hex")}`;
    case "byteArray":
      return JSON.stringify(signature.toJSON().data);
  }
};
