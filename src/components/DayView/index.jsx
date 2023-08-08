import React, { useState, useEffect } from "react";
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
  maxHeight: "60vh",
  // paddingBottom: "16px", // Adjust this value based on your footer's height and any additional padding you want above the footer
});

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});

const DayView = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-01:00",
    "01:00-02:00",
    "02:00-03:00",
    "03:00-04:00",
    "04:00-05:00",
  ];

  const scheduleData = [
    {
      slot: "09:00-10:00",
      subject: "Math",
      instructor: "Rahul K",
      location: "Room A101",
    },
    {
      slot: "10:00-11:00",
      subject: "Science",
      instructor: "Suman Mishra",
      location: "Room B203",
    },
    {
      slot: "12:00-01:00",
      subject: "History",
      instructor: "Kalyan P",
      location: "Room C307",
    },
    // Add more schedule data for other slots, subjects, instructors, and locations
  ];

  return (
    <div>
      <Container>
        <input
          style={{ marginTop: "16px" }}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Container>
      <CustomTableContainer component={Paper}>
        <Table style={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "1px solid black" }}>
                Slot{"  "}
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                Schedule
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((slot) => {
              const slotSchedule = scheduleData.find(
                (item) => item.slot === slot
              );
              return (
                <TableRow key={slot} style={{ border: "1px solid black" }}>
                  <TableCell style={{ border: "1px solid black" }}>
                    {slot}
                  </TableCell>
                  <TableCell style={{ border: "1px solid black" }}>
                    {slotSchedule ? (
                      <div>
                        <p>
                          <strong>Subject:</strong> {slotSchedule.subject}
                          &nbsp;&nbsp;&nbsp;
                          <strong>Instructor:</strong> {slotSchedule.instructor}
                          &nbsp;&nbsp;&nbsp;
                          <strong>Location:</strong> {slotSchedule.location}
                        </p>
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

export default DayView;
