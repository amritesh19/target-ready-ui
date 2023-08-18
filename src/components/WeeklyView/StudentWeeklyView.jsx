import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useAlert } from "../AlertContext";
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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTableContainer = styled(TableContainer)({
  maxWidth: 900,
  margin: "auto",
  marginTop: "16px",
  width: 1900,
  height: 400,
  marginLeft: "-20%",
  overflow: "auto",
});

const StudentWeeklyView = () => {
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  const alert = useAlert();
  let classId=localStorage.getItem('classid');
  const handleCellClick = (day, time) => {
    const cellData = table.find(
      (item) => item.week === day && item.slot === time
    );
    setSelectedCellData(cellData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [table,setTable]=useState([]);

  useEffect(() => {
    fetchData(classId);
  }, []);


  const fetchData = (classId) => {
    try{
        axios
        .get(`http://localhost:8087/time_table/student/${classId}`)
        .then((response) => {
          setTable(response.data);
        })
    }catch(error) {
        alert.showAlertWithMessage("No data found!", "error");
    };
  };

  console.log(table);


  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const timeSlots = [
    "9:00am-10:00am",
    "10:00am-11:00am",
    "11:00am-12:00pm",
    "12:00pm-1:00pm",
    "1:00pm-2:00pm",
    "2:00pm-3:00pm",
    "3:00pm-4:00pm",
    "4:00pm-5:00pm",
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
                  const cellData = table.find(
                    (item) => item.week === day && item.slot === slot
                  );
                  let message;
                  if (cellData) {
                    message = <p>{cellData.courseName}</p>;
                  }
                  else if(slot=="12:00pm-1:00pm"){
                    message = <p>Lunch</p>;
                  }
                  else {
                    message = <p>Leisure</p>;
                  }
                  return (
                    <TableCell
                      key={`${slot}-${day}`}
                      onClick={() => handleCellClick(day, slot)}
                    >
                      {message}
                      {/* {cellData ? cellData.courseName : "lunch"} */}
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
              Subject: {selectedCellData?.courseName}

            </Typography>

            <Typography variant="body1">
              Day: {selectedCellData?.week}
            </Typography>
            <Typography variant="body1">
              Time: {selectedCellData?.slot}
            </Typography>
            <Typography variant="body1">{selectedCellData?.location}</Typography>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
          </CardContent>
        </Card>
      </Modal>



    </>
  );
};
export default StudentWeeklyView;
