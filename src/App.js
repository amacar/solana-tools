import { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { Header } from "./components/Header";
import { VerifyMessage } from "./components/VerifyMessage";
import { SignMessage } from "./components/SignMessage";

const TabPanel = ({ children, value, index }) => <>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</>;
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new SolletWalletAdapter()];

export const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletDialogProvider>
        <Header />
        <Container style={{ maxWidth: "700px" }}>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab style={{ fontWeight: "bold" }} label="Sign Message" />
                <Tab style={{ fontWeight: "bold" }} label="Verify Message" />
              </Tabs>
            </Box>
            <Box>
              <TabPanel value={selectedTab} index={0}>
                <SignMessage />
              </TabPanel>
              <TabPanel value={selectedTab} index={1}>
                <VerifyMessage />
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </WalletDialogProvider>
    </WalletProvider>
  );
};
