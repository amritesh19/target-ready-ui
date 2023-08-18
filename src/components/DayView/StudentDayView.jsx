import React, { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
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
import { useAlert } from "../AlertContext";

const CustomTableContainer = styled(TableContainer)({
  maxWidth: 900,
  margin: "auto",
  marginTop: "1vh",
  marginBottom: "1vh",
  maxHeight: "55vh",
  // paddingBottom: "16px", // Adjust this value based on your footer's height and any additional padding you want above the footer
});

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});


const StudentDayView = () => {
  // alert.showAlertWithMessage("selected class is:"+selectedClass, "success");

  const [studentData, setStudentData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [show,setShow]=useState(true);
  
  let id=localStorage.getItem('id');
  const [table,setTable]=useState([]);

  const alert = useAlert();
  let classId;

  useEffect(() => {
    if(selectedDate !== ""){
        fetchData(selectedDate);
        setShow(true);
    }
    else{
        setShow(false);
    }
  },[]);

  

  const fetchData = async (date) => {
    try{
      classId=localStorage.getItem('classid');
      const response = await axios.get(`http://localhost:8087/time_table/student/${classId}/${date}`);
      // axios.get(`http://localhost:8087/time_table/student/${classId}/${date}`)
      // .then((response) => {
      //   setTable(response.data);
      //   })
      setTable(response.data);
      setShow(true);
    }catch(error) {
        setShow(false);
        alert.showAlertWithMessage("No data found!", "error");
    };
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    fetchData(date);
  };


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
    <div>
      <Container>
        <input 
          style={{ marginTop: "16px" }}
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateSelect(e.target.value)}
        />
      </Container>
      
      {show && (
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
                const slotSchedule = table.find(
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
                            <strong>Subject:</strong> {slotSchedule.courseName}
                            &nbsp;&nbsp;&nbsp;
                            <strong>Instructor:</strong> {slotSchedule.instructorName}
                            &nbsp;&nbsp;&nbsp;
                            <strong>Location:</strong> {slotSchedule.location}
                            </p>
                        </div>
                        ) : (slot==="12:00pm-1:00pm")?(<p>Lunch</p>
                        ):<p>Leasure</p>}
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </CustomTableContainer>

    )}
    </div>
  );
};

export default StudentDayView;
