import React from 'react';

const tableStyles = {
  margin: '0 auto', // To center the table
  maxWidth: '800px', // You can adjust the width as per your requirement
  padding: '10px', // Adding padding to the table
};

const titleStyles = {
  fontWeight: 'bold',
  backgroundColor: '#aabce7', // Background color for the titles
  padding: '10px', // Adding padding to the title cells
};

const Course = () => {
  // Sample data, replace this with your actual data
  const courseData = [
    { serialNumber: 1, courseId: 'CID001', courseName: 'Introduction to React', courseInstructor: 'John Doe' },
    { serialNumber: 2, courseId: 'CID002', courseName: 'JavaScript Fundamentals', courseInstructor: 'Jane Smith' },
    // Add more course data here
  ];

  return (
    <div style={tableStyles}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={titleStyles}>Serial Number</th>
            <th style={titleStyles}>Course ID</th>
            <th style={titleStyles}>Course Name</th>
            <th style={titleStyles}>Course Instructor</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course) => (
            <tr key={course.courseId}>
              <td style={{ padding: '10px' }}>{course.serialNumber}</td>
              <td style={{ padding: '10px' }}>{course.courseId}</td>
              <td style={{ padding: '10px' }}>{course.courseName}</td>
              <td style={{ padding: '10px' }}>{course.courseInstructor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
