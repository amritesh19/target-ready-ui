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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import './index.css';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const tableStyles = {
  maxWidth: 900,
  margin: "auto", // To center the table
  marginTop: "100px", // You can adjust the width as per your requirement
  width: 900,
  height: 350,
  marginLeft: "20%",
  overflow: "auto",
};

const titleStyles = {
  fontWeight: "bold",
  backgroundColor: "#aabce7", // Background color for the titles
  padding: "10px", // Adding padding to the title cells
};

const headingStyle = {
  // border:'1px solid black',
  position: "absolute",
  left: "45%",
  top: "20%",
  padding: "10px",
  boxShadow: "0px 0.5px 1px",
};

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  const [newStudentData, setNewStudentData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [contactErrorText, setContactErrorText] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editData, setEditData] = useState({
    studentId: "",
    studentName: "",
    classId: "",
    studentContact: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8087/students")
      .then((response) => {
        console.log(response.data);

        setStudentData(response.data);
        console.log(studentData);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleEdit = (studentId) => {
    const student = studentData.find(
      (student) => student.studentId === studentId
    );
    if (student) {
      setEditData({
        studentId: student.studentId,
        studentName: student.studentName,
        classId: student.classId,
        studentContact: student.studentContact,
      });
      setOpenEditDialog(true);
    }
    console.log(editData);
  };

  const handleAdd = () => {

      setOpenAddDialog(true);

  };


  const handleSaveEdit = async (event) => {
    event.preventDefault();
    console.log(editData);
    try{
             const response = await axios.put(
        `http://localhost:8087/students/${editData.studentId}/${editData.studentName}/${editData.classId}/${editData.studentContact}`,
        {
          studentName: editData.studentName,
          classId: editData.classId,
          studentContact: editData.studentContact,
        }
      );
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.studentId === editData.studentId
            ? {
                ...student,
                studentName: editData.studentName,
                classId: editData.classId,
                studentContact: editData.studentContact,
              }
            : student
          )
        );
        setOpenEditDialog(false);
      }catch(error) {
        setContactErrorText("Contact already exists!");
        console.error("Error updating student data:", error);
        setOpenEditDialog(false);
      };
  };

  const handleSaveAdd = () => {
    console.log(newStudentData);
    axios
      .post(
        `http://localhost:8087/students`,
        {
          studentName: newStudentData.studentName,
          classId: newStudentData.classId,
          studentContact: newStudentData.studentContact,
        }
      )
      .then((response) => {
        console.log(response);
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error adding student data:", error);
        setOpenEditDialog(false);
      });
  };
  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:8087/students/${studentId}`)
      .then((response) => {
        setStudentData((prevData) =>
          prevData.filter(
            (student) => student.studentId !== studentId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting student data:", error);
      });
  };

  return (
    <card className="App-card">
     <div>
     <Button style={{ display: 'flex', justifyContent: 'middle-right', variant:'contained' }} onClick={() => handleAdd()}>Add New Student</Button>
      <div style={headingStyle}>LIST OF STUDENTS</div>
      </div>
      <TableContainer component={Paper} style={tableStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={titleStyles}>Serial Number</TableCell>
              <TableCell style={titleStyles}>Student ID</TableCell>
              <TableCell style={titleStyles}>Student Name</TableCell>
              <TableCell style={titleStyles}>Class ID</TableCell>
              <TableCell style={titleStyles}>Student Contact</TableCell>
              <TableCell style={titleStyles}>Update/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student, index) => (
              <TableRow key={student.studentId}>
                <TableCell style={{ padding: "10px" }}>{index + 1}</TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {student.studentId}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {student.studentName}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {student.classId}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {student.studentContact}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(student.studentId)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(student.studentId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
{/*                 <Button */}
{/*                   color="primary" */}
{/*                   variant="contained" */}
{/*                   onClick={handleAdd} > */}
{/*                   Add new student */}
{/*                 </Button> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} PaperProps={{ className: 'dialog-box'  }}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Student Name"
            value={editData.studentName}
            onChange={(e) =>
              setEditData({ ...editData, studentName: e.target.value })
            }
            style={{ marginBottom: '10px' ,marginTop: '10px'}}
            fullWidth
          />
          <TextField
            label="Class ID"
            value={editData.classId}
            onChange={(e) =>
              setEditData({ ...editData, classId: e.target.value })
            }
            style={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label="Student Contact"
            value={editData.studentContact}
            onChange={(e) =>
              {
              setContactErrorText('');
              setEditData({ ...editData, studentContact: e.target.value });
              }
            }
            fullWidth
          />
          <div id="contact_error">{contactErrorText}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} PaperProps={{ className: 'dialog-box' }}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <TextField
              label="Student Name"
              value={newStudentData.studentName}
              onChange={(e) =>
                setNewStudentData({ ...newStudentData, studentName: e.target.value })
              }
              style={{ marginBottom: '10px' ,marginTop: '10px'}}
              fullWidth
            />
            <TextField
              label="Class ID"
              value={newStudentData.classId}
              onChange={(e) =>
                setNewStudentData({ ...newStudentData, classId: e.target.value })
              }
              style={{ marginBottom: '10px' }}
              fullWidth
            />
            <TextField
              label="Student Contact"
              value={newStudentData.studentContact}
              onChange={(e) =>
                setNewStudentData({ ...newStudentData, studentContact: e.target.value })
              }
              style={{ marginBottom: '10px'}}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveAdd} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </card>
  );
};

export default Student;
