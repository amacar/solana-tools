import { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";

import { Header } from "./components/Header";
import { VerifyMessage } from "./components/VerifyMessage";

const TabPanel = ({ children, value, index }) => <>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</>;

export const App = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
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
              Work in progress...
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              <VerifyMessage />
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
};
