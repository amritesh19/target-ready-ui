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
  Card,
  CardContent,
  Grid,
  Box
} from "@mui/material";
import './index.css';
import { left } from "@popperjs/core";

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
    <>
    {/* <Grid
      container
      justifyContent="center"
      alignItems="center"
      //style={{ height: "70vh" }}
    > */}
    <Card
    sx={{
      backgroundColor:'#aabce7',
      marginLeft:'45%',
      marginRight:'45%',
      marginTop:'1%',
      fontWeight:'bold'
    }}
    >
      {/* <CardContent>View: Weekly</CardContent> */}
    </Card>
    {/* </></Grid>  */}
    {/* 
    <Box
    sx={{
      marginLeft:'50%',
      marginTop:'10%',
      width: 100,
      height: 50,
      backgroundColor: '#aabce7;'
    }}
    >Hello</Box> */}
    <CustomTableContainer component={Paper}
    sx={{
      width: 1900,
      height: 450,
      marginLeft:'-20%',
      overflow: 'auto'
      
    }}
    >
      <Table >
        <TableHead>
          <TableRow >
            <TableCell id="bold">Time Slot</TableCell>
            {timeSlots.map((slot) => (
              <TableCell key={slot}>{slot}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {days.map((day) => (
            <TableRow key={day}>
              <TableCell id="bold">{day}</TableCell>
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
    </>
  );
};

export default TimeTable;
