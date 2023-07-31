import { Card } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Instructor = () => {
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/admin/instructors")
      .then((response) => {
        setInstructorData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructor data:", error);
      });
  }, []);

  const myStyle = {
    display: "flex",
    alignItem: "center",
    height: "100%",
    border: "5px solid black",
    background: "blue",
  };
  const myStyle2 = {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(0px,-50%)",
  };
  return (
    <Card className="App-Card" style={myStyle2}>
      <h3 style={{ border: "1px solid black", padding: "15px" }}>
        List of Instructors
      </h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ border: "1px solid black" }}>
              <TableCell
                style={{
                  fontWeight: "bold",
                  background: "#aabce7",
                  border: "1px solid black",
                }}
              >
                Serial Number
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  background: "#aabce7",
                  border: "1px solid black",
                }}
              >
                Instructor ID
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  background: "#aabce7",
                  border: "1px solid black",
                }}
              >
                Instructor Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  background: "#aabce7",
                  border: "1px solid black",
                }}
              >
                Instructor Contact
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorData.map((instructor, index) => (
              <TableRow key={instructor.instructor_id}>
                <TableCell style={{ border: "1px solid black" }}>
                  {index + 1}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {instructor.instructor_id}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {instructor.instructor_name}
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  {instructor.instructor_contact}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
export default Instructor;
