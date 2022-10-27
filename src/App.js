import { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { Header } from "./components/Header";
import { VerifyMessage } from "./components/VerifyMessage";
import { SignMessage } from "./components/SignMessage";

const SIGN_ROUTE = "/#sign-message";
const VERIFY_ROUTE = "/#verify-message";
const routeRegex = new RegExp(`(${SIGN_ROUTE}|${VERIFY_ROUTE})`);

const TabPanel = ({ children, value, index }) => <>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</>;

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new SolletWalletAdapter()];

export const App = () => {
  const isVerify = window.location.href.includes(VERIFY_ROUTE);
  const [selectedTab, setSelectedTab] = useState(isVerify ? 1 : 0);

  const handleTabChange = (_, value) => {
    setSelectedTab(value);
    const currentUrl = window.location.href.replace(/\/$/, "");
    const url = `${currentUrl.replace(routeRegex, "")}${value ? VERIFY_ROUTE : SIGN_ROUTE}`;
    window.history.replaceState({}, "", url);
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
