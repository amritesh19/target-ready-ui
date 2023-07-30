import { Card } from "@mui/material";
import React from 'react';

const tableStyles = {
  margin: '0 auto', // To center the table
  maxWidth: '800px', // You can adjust the width as per your requirement
  // padding:'5px'
};

const titleStyles = {
  fontWeight: 'bold',
  padding:'10px',
  background:'#aabce7'
};

const dataStyle = {
  padding:'10px'
}

const Class = () => {
  // Sample data, replace this with your actual data
  const classData = [
    { serialNumber: 1, classId: 'CID001', className: 'Mathematics', classSection: 'A', classStrength: 30 },
    { serialNumber: 2, classId: 'CID002', className: 'Science', classSection: 'B', classStrength: 25 },
    // Add more class data here
  ];

  return (
    <Card className="App-Card" style={{
      position:"absolute",
      top:"40%",
      left:"30%",
      transform: "translate(0px,-50%)",

      }}>
      <h3 style={{border:'1px solid black',padding:'15px'}}>List of Classes</h3>
      <div style={tableStyles}>
      <table>
        <thead>
          <tr>
            <th style={titleStyles}>Serial Number</th>
            <th style={titleStyles}>Class ID</th>
            <th style={titleStyles}>Class Name</th>
            <th style={titleStyles}>Class Section</th>
            <th style={titleStyles}>Class Strength</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((classInfo) => (
            <tr key={classInfo.classId}>
              <td style={dataStyle}>{classInfo.serialNumber}</td>
              <td style={dataStyle}>{classInfo.classId}</td>
              <td style={dataStyle}>{classInfo.className}</td>
              <td style={dataStyle}>{classInfo.classSection}</td>
              <td style={dataStyle}>{classInfo.classStrength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Card>
  );
};

export default Class;
