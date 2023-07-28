import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import "./index.css";

const CustomTableContainer = styled(TableContainer)({
  maxWidth: 900,
  margin: "auto",
  marginTop: "16px",
  width: 1900,
  height: 450,
  marginLeft: "-20%",
  overflow: "auto",
});

const WeeklyView = () => {
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCellClick = (day, time) => {
    const cellData = scheduleData.find(
      (item) => item.day === day && item.time === time
    );
    setSelectedCellData(cellData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                    <TableCell
                      key={`${slot}-${day}`}
                      onClick={() => handleCellClick(day, slot)}
                    >
                      {cellData ? cellData.subject : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Card className="modal-card">
          <CardContent>
            <Typography variant="h6">
              Subject: {selectedCellData?.subject}
            </Typography>
            <Typography variant="body1">
              Day: {selectedCellData?.day}
            </Typography>
            <Typography variant="body1">
              Time: {selectedCellData?.time}
            </Typography>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default WeeklyView;
