import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const CalendarContainer = styled(Box)({
  maxWidth: 600,
  margin: "auto",
  marginTop: "16px",
});

const Calendar = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { user } = useContext(UserContext);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <CalendarContainer>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Day View" />
        <Tab label="Week View" />
      </Tabs>
      {selectedTab === 0 && <div>Day View Content</div>}
      {selectedTab === 1 && <div>Week View Content</div>}
    </CalendarContainer>
  );
};

export default Calendar;
