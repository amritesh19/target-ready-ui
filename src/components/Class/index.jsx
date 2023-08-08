import { Card } from "@mui/material";
import React from "react";

const tableStyles = {
  margin: "0 auto", // To center the table
  maxWidth: "800px",
  // padding:'5px'
};

const titleStyles = {
  fontWeight: "bold",
  padding: "10px",
  background: "#aabce7",
};

const dataStyle = {
  padding: "10px",
};

const Class = () => {
  const classData = [
    {
      serialNumber: 1,
      classId: "CID001",
      className: "X",
      classSection: "A",
      classStrength: 30,
    },
    {
      serialNumber: 2,
      classId: "CID002",
      className: "X",
      classSection: "B",
      classStrength: 25,
    },
    {
      serialNumber: 3,
      classId: "CID003",
      className: "IX",
      classSection: "A",
      classStrength: 15,
    },
    {
      serialNumber: 4,
      classId: "CID004",
      className: "IX",
      classSection: "B",
      classStrength: 29,
    },
    // Add more class data here
  ];

  return (
    <Card
      className="App-Card"
      style={{
        position: "absolute",
        top: "40%",
        left: "30%",
        transform: "translate(0px,-50%)",
      }}
    >
      <h3 style={{ border: "1px solid black", padding: "15px" }}>
        List of Classes
      </h3>
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
