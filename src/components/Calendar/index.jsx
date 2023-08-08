import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import DayView from "../DayView";
import WeeklyView from "../WeeklyView";
import { TabList } from "@mui/lab";

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
        {/* <TabList> */}
        <Tab label="Day View" />
        <Tab label="Week View" />
        {/* </TabList> */}
      </Tabs>
      {selectedTab === 0 && <DayView />}
      {selectedTab === 1 && <WeeklyView />}
    </CalendarContainer>
  );
};

export default Calendar;
