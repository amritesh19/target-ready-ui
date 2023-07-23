import React from "react";
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const CustomTableContainer = styled(TableContainer)({
  maxWidth: 900,
  margin: "auto",
  marginTop: "16px",
});

const TimeTable = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    { day: "Monday", time: "9:00-10:00", subject: "Math" },
    { day: "Tuesday", time: "10:00-11:00", subject: "Science" },
    { day: "Wednesday", time: "12:00-1:00", subject: "History" },
  ];

  return (
    <CustomTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time Slot</TableCell>
            {timeSlots.map((slot) => (
              <TableCell key={slot}>{slot}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day}>
              <TableCell>{day}</TableCell>
              {timeSlots.map((slot) => {
                const cellData = scheduleData.find(
                  (item) => item.day === day && item.time === slot
                );
                return (
                  <TableCell key={`${slot}-${day}`}>
                    {cellData ? cellData.subject : ""}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default TimeTable;
