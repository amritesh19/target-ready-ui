import { Card } from "@mui/material";
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Instructor = () => {

  const instructorData = [
    { serialNumber: 1, instructorId: 'ID001', instructorName: 'John Doe', instructorContact: 'john@example.com' },
    { serialNumber: 2, instructorId: 'ID002', instructorName: 'Jane Smith', instructorContact: 'jane@example.com' },
    // Add more instructor data here
  ];

  const myStyle = {
    display: "flex",
    alignItem: "center",
    height: "100%",
    border:'5px solid black',
    background:'blue'

  }
  const myStyle2 = {
    position:"absolute",
    top:"50%",
    left:"30%",
    transform: "translate(0px,-50%)",
  }
  return (
    <Card className="App-Card" style={myStyle2}>
      <h3 style={{border:'1px solid black',padding:'15px'}}>List of Instructors</h3>
      <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow style={{border:'1px solid black'}}>
            <TableCell style={{fontWeight:'bold', background:'#aabce7',border:'1px solid black' }}>Serial Number</TableCell>
            <TableCell style={{fontWeight:'bold', background:'#aabce7',border:'1px solid black'}}>Instructor ID</TableCell>
            <TableCell style={{fontWeight:'bold', background:'#aabce7',border:'1px solid black'}}>Instructor Name</TableCell>
            <TableCell style={{fontWeight:'bold', background:'#aabce7',border:'1px solid black'}}>Instructor Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructorData.map((instructor) => (
            <TableRow key={instructor.instructorId} >
              <TableCell style={{border:'1px solid black'}}>{instructor.serialNumber}</TableCell>
              <TableCell style={{border:'1px solid black'}}>{instructor.instructorId}</TableCell>
              <TableCell style={{border:'1px solid black'}}>{instructor.instructorName}</TableCell>
              <TableCell style={{border:'1px solid black'}}>{instructor.instructorContact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  );
};
export default Instructor;