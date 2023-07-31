import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const tableStyles = {
  margin: '0 auto', // To center the table
  maxWidth: '800px', // You can adjust the width as per your requirement
  padding: '10px', // Adding padding to the table
  position: 'absolute',
  top: '30%',
  left: '20%'
};

const titleStyles = {
  fontWeight: 'bold',
  backgroundColor: '#aabce7', // Background color for the titles
  padding: '10px', // Adding padding to the title cells
};

const headingStyle = {
  // border:'1px solid black',
  position:'absolute',
  left:'45%',
  top:'20%',
  padding:'10px',
  boxShadow: '0px 0.5px 1px',
  
}

const Instructor = () => {
  // Sample data, replace this with your actual data
  const instructorData = [
    { serialNumber: 1, instructorId: 'ID001', instructorName: 'John Doe', instructorContact: 'john@example.com' },
    { serialNumber: 2, instructorId: 'ID002', instructorName: 'Jane Smith', instructorContact: 'jane@example.com' },
    // Add more instructor data here
  ];

  return (
    <card className='App-card'>
    <div style={headingStyle}>LIST OF INSTRUCTOR</div>
      <TableContainer component={Paper} style={tableStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={titleStyles}>Serial Number</TableCell>
              <TableCell style={titleStyles}>Instructor ID</TableCell>
              <TableCell style={titleStyles}>Instructor Name</TableCell>
              <TableCell style={titleStyles}>Instructor Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorData.map((instructor) => (
              <TableRow key={instructor.instructorId}>
                <TableCell style={{ padding: '10px' }}>{instructor.serialNumber}</TableCell>
                <TableCell style={{ padding: '10px' }}>{instructor.instructorId}</TableCell>
                <TableCell style={{ padding: '10px' }}>{instructor.instructorName}</TableCell>
                <TableCell style={{ padding: '10px' }}>{instructor.instructorContact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </card>  
  );
};

export default Instructor;
