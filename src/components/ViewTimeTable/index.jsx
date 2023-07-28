import React, { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Menu,

  MenuItem,
} from "@mui/material";

const CustomTableContainer = styled(TableContainer)({
  maxWidth: 900,
  margin: "auto",
  marginTop: "1vh",
  marginBottom: "1vh",
  maxHeight: "60vh"
  // paddingBottom: "16px", // Adjust this value based on your footer's height and any additional padding you want above the footer
});

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});

const FlexRow = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const CalenderHeadline = styled("h2")({
  margin: "0",
});

const LogoutButton = styled(Button)({
  marginLeft: "auto",
});


const ViewTimeTable = () => {
  useEffect(() => {
    setViewOption(null);
  }, []);
  const [viewOption, setViewOption] = useState("daily"); // State for view option: daily or monthly
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  const handleViewOptionChange = (option) => {
    setViewOption(option);
  };
  const handleViewOptionClick = (event) => {
    setViewOption(event.currentTarget);
  };
  
  const handleViewOptionClose = () => {
    setViewOption(null);
  };
  const handleViewOptionSelect = (option) => {
    setViewOption(null);
    // Handle the selected view option
    // You can add logic here to show different content based on the selected option
    console.log("Selected View Option:", option);
  };
  

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const timeSlots = [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
    "4:00-5:00",
  ];

  const scheduleData = [
    {
      slot: "9:00-10:00",
      subject: "Math",
      instructor: "John Doe",
      location: "Room A101",
    },
    {
      slot: "10:00-11:00",
      subject: "Science",
      instructor: "Jane Smith",
      location: "Room B203",
    },
    {
      slot: "12:00-1:00",
      subject: "History",
      instructor: "Michael Johnson",
      location: "Room C307",
    },
    // Add more schedule data for other slots, subjects, instructors, and locations
  ];

  return (
    <div>
      <Container>
        {/* <FlexRow>
          <CalenderHeadline>Calendar Headline</CalenderHeadline>
          <LogoutButton variant="contained" color="secondary">Logout</LogoutButton>
        </FlexRow> */}
      
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleViewOptionClick}
        >
          View Daily
        </Button> */}
        {/* View Options Menu */}
        {/* <Menu
          anchorEl={viewOption}
          open={Boolean(viewOption)}
          onClose={handleViewOptionClose}
        >
          <MenuItem onClick={() => handleViewOptionSelect("Option 1")}>
            Option 1
          </MenuItem>
          <MenuItem onClick={() => handleViewOptionSelect("Option 2")}>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => handleViewOptionSelect("Option 3")}>
            Option 3
          </MenuItem>
        </Menu> */}
        {/* <DatePicker
          label="Choose Date"
          value={selectedDate}
          onChange={(date) => handleDateSelect(date)}
          animateYearScrolling
          openTo="day"
          format="MM/dd/yyyy"
        /> */}
         <input style={{marginTop:'16px'}}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Container>
      <CustomTableContainer component={Paper}>
        <Table style={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "1px solid black" }}>Slot</TableCell>
              <TableCell style={{ border: "1px solid black" }}>Schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot) => {
              const slotSchedule = scheduleData.find((item) => item.slot === slot);
              return (
                <TableRow key={slot} style={{ border: "1px solid black" }}>
                  <TableCell style={{ border: "1px solid black" }}>{slot}</TableCell>
                  <TableCell style={{ border: "1px solid black" }}>
                    {slotSchedule ? (
                      <div>
                        <p><strong>Subject:</strong> {slotSchedule.subject}&nbsp;&nbsp;&nbsp;
                        <strong>Instructor:</strong> {slotSchedule.instructor}&nbsp;&nbsp;&nbsp;
                        <strong>Location:</strong> {slotSchedule.location}</p>
                      </div>
                    ) : (
                      <p>No schedule available</p>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </div>
  );
};

export default ViewTimeTable;
