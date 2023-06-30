import { useState } from "react";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { CustomTextField } from "./TextField";
import { SignatureFormat } from "./SignatureFormat";

export const VerifyMessage = () => {
  const [sigFormat, setSigFormat] = useState("byteArray");
  const [message, setMessage] = useState("signed message");
  const [address, setAddress] = useState("N6ywVtXEfm8CsAQasaGAG4aeN7LLNDMtrh88Q1uHscg");
  const [signature, setSignature] = useState(
    "[23,42,195,185,112,68,99,252,236,27,75,72,221,64,175,196,73,151,46,54,187,214,123,110,51,187,183,179,141,153,17,74,221,101,254,245,175,101,40,80,60,61,54,37,191,134,134,248,40,86,126,215,42,252,200,50,181,28,197,181,63,237,222,13]"
  );

  let result = false;
  try {
    const messageBytes = Buffer.from(message);
    const publicKeyBytes = bs58.decode(address);
    const messages = getMessageBytes(sigFormat, messageBytes);
    const signatureBytes = getSignatureBytes(sigFormat, signature);
    result = messages.some((message) => {
      try {
        return nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes);
      } catch {
        return false;
      }
    });
  } catch {}

  return (
    <div>
      <CustomTextField multiline label="Message" value={message} setValue={setMessage} />
      <CustomTextField label="SOL Address" value={address} setValue={setAddress} />
      <CustomTextField multiline minRows={4} label="Signature" value={signature} setValue={setSignature} />
      <SignatureFormat sigFormat={sigFormat} onSigFormatChange={(e) => setSigFormat(e.target.value)} />
      <div style={{ textAlign: "center", marginTop: "35px" }}>
        <span
          style={{
            backgroundColor: result ? "#2e7d32" : "#d32f2f",
            color: "white",
            borderRadius: "20px",
            padding: "15px",
            fontWeight: "bold",
            fontSize: "x-large",
          }}
        >
          Signature is {!result && "not "} verified!
        </span>
      </div>
    </div>
  );
};

const getSignatureBytes = (sigFormat, signature) => {
  switch (sigFormat) {
    case "base58":
      return bs58.decode(signature);
    case "base64":
      return Buffer.from(signature, sigFormat);
    case "hex":
      return Buffer.from(signature.replace("0x", ""), sigFormat);
    case "byteArray":
      return Buffer.from(JSON.parse(signature), "hex");
  }
};

const getMessageBytes = (sigFormat, message) => {
  const messageBytes = Buffer.from(message);
  const messages = [messageBytes];

  if (sigFormat === "base58") {
    const domain = Buffer.concat([Buffer.from(["0xff"]), Buffer.from("solana offchain")]);
    const version = Buffer.from([0]);
    const messageTypes = [Buffer.from([0]), Buffer.from([1]), Buffer.from([2])];
    const messageLength = Buffer.from(new Uint8Array(new Uint16Array([messageBytes.length]).buffer));
    messages.push(
      ...messageTypes.map((messageType) => Buffer.concat([domain, version, messageType, messageLength, messageBytes]))
    );
  }

  return messages;
};
