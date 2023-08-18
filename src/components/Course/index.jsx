import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";

const tableStyles = {
  margin: "0 auto", // To center the table
  maxWidth: "800px", // You can adjust the width as per your requirement
  padding: "10px", // Adding padding to the table
};

const titleStyles = {
  fontWeight: "bold",
  backgroundColor: "#aabce7", // Background color for the titles
  padding: "10px", // Adding padding to the title cells
};

const Course = () => {
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editData, setEditData] = useState({
    courseId: "",
    classId: "",
    courseName: "",
    instructorId: "",
    location: "",
  });

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
        List of Courses
      </h3>
      <div style={tableStyles}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={titleStyles}>Serial Number</th>
              <th style={titleStyles}>Course ID</th>
              <th style={titleStyles}>Class ID</th>
              <th style={titleStyles}>Course Name</th>
              <th style={titleStyles}>Course Instructor</th>
              <th style={titleStyles}>Location</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course) => (
              <tr key={course.courseId}>
                <td style={{ padding: "10px" }}>{course.serialNumber}</td>
                <td style={{ padding: "10px" }}>{course.courseId}</td>
                <td style={{ padding: "10px" }}>{course.courseName}</td>
                <td style={{ padding: "10px" }}>{course.courseInstructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Course;
