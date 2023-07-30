import { Card } from "@mui/material";
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Instructor = () => {

  const instructorData = [
    { serialNumber: 1, instructorId: 'ID001', instructorName: 'John Doe', instructorContact: 'john@example.com' },
    { serialNumber: 2, instructorId: 'ID002', instructorName: 'Jane Smith', instructorContact: 'jane@example.com' },
    // Add more instructor data here
  ];

  return (
    <Card className="App-Card">
      <h3>List of Instructors</h3>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>Instructor ID</TableCell>
            <TableCell>Instructor Name</TableCell>
            <TableCell>Instructor Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructorData.map((instructor) => (
            <TableRow key={instructor.instructorId}>
              <TableCell>{instructor.serialNumber}</TableCell>
              <TableCell>{instructor.instructorId}</TableCell>
              <TableCell>{instructor.instructorName}</TableCell>
              <TableCell>{instructor.instructorContact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>
  );
};
export default Instructor;