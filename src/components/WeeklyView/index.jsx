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
    // Monday
    { day: "Monday", time: "9:00-10:00", subject: "Math" },
    { day: "Monday", time: "10:00-11:00", subject: "Science" },
    { day: "Monday", time: "11:00-12:00", subject: "English" },
    { day: "Monday", time: "12:00-1:00", subject: "History" },
    { day: "Monday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Monday", time: "2:00-3:00", subject: "Geography" },
    { day: "Monday", time: "3:00-4:00", subject: "Physics" },
    { day: "Monday", time: "4:00-5:00", subject: "Chemistry" },

    // Tuesday
    { day: "Tuesday", time: "9:00-10:00", subject: "Science" },
    { day: "Tuesday", time: "10:00-11:00", subject: "Math" },
    { day: "Tuesday", time: "11:00-12:00", subject: "English" },
    { day: "Tuesday", time: "12:00-1:00", subject: "History" },
    { day: "Tuesday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Tuesday", time: "2:00-3:00", subject: "Geography" },
    { day: "Tuesday", time: "3:00-4:00", subject: "Physics" },
    { day: "Tuesday", time: "4:00-5:00", subject: "Chemistry" },

    // Wednesday
    { day: "Wednesday", time: "9:00-10:00", subject: "Math" },
    { day: "Wednesday", time: "10:00-11:00", subject: "Science" },
    { day: "Wednesday", time: "11:00-12:00", subject: "English" },
    { day: "Wednesday", time: "12:00-1:00", subject: "History" },
    { day: "Wednesday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Wednesday", time: "2:00-3:00", subject: "Sports" },
    { day: "Wednesday", time: "3:00-4:00", subject: "Physics" },
    { day: "Wednesday", time: "4:00-5:00", subject: "Chemistry" },

    // Thursday
    { day: "Thursday", time: "9:00-10:00", subject: "Science" },
    { day: "Thursday", time: "10:00-11:00", subject: "Math" },
    { day: "Thursday", time: "11:00-12:00", subject: "English" },
    { day: "Thursday", time: "12:00-1:00", subject: "History" },
    { day: "Thursday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Thursday", time: "2:00-3:00", subject: "Geography" },
    { day: "Thursday", time: "3:00-4:00", subject: "Physics" },
    { day: "Thursday", time: "4:00-5:00", subject: "Chemistry" },

    // Friday
    { day: "Friday", time: "9:00-10:00", subject: "Math" },
    { day: "Friday", time: "10:00-11:00", subject: "Science" },
    { day: "Friday", time: "11:00-12:00", subject: "English" },
    { day: "Friday", time: "12:00-1:00", subject: "History" },
    { day: "Friday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Friday", time: "2:00-3:00", subject: "Hindi" },
    { day: "Friday", time: "3:00-4:00", subject: "Physics" },
    { day: "Friday", time: "4:00-5:00", subject: "Chemistry" },

    // Saturday
    { day: "Saturday", time: "9:00-10:00", subject: "Biology" },
    { day: "Saturday", time: "10:00-11:00", subject: "Science" },
    { day: "Saturday", time: "11:00-12:00", subject: "English" },
    { day: "Saturday", time: "12:00-1:00", subject: "History" },
    { day: "Saturday", time: "1:00-2:00", subject: "Lunch" },
    { day: "Saturday", time: "2:00-3:00", subject: "Geography" },
    { day: "Saturday", time: "3:00-4:00", subject: "Physics" },
    { day: "Saturday", time: "4:00-5:00", subject: "Hindi" },
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
            <Typography variant="body1">Location: Room No. 101</Typography>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default WeeklyView;
