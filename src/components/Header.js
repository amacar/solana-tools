const style = {
  backgroundColor: "#282c34",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  position: "relative",
  width: "100%",
  textAlign: "center",
};

export const Header = () => (
  <header style={style}>
    <h1>Solana Sign / Verify Message</h1>
  </header>
);
