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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const tableStyles = {
  margin: "0 auto", // To center the table
  maxWidth: "800px", // You can adjust the width as per your requirement
  padding: "10px", // Adding padding to the table
  position: "absolute",
  top: "30%",
  left: "20%",
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

const Instructor = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    instructorId: "",
    instructorName: "",
    instructorContact: "",
  });

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

  const handleEdit = (instructorId) => {
    const instructor = instructorData.find(
      (instructor) => instructor.instructor_id === instructorId
    );
    if (instructor) {
      setEditData({
        instructorId: instructor.instructor_id,
        instructorName: instructor.instructor_name,
        instructorContact: instructor.instructor_contact,
      });
      setOpenEditDialog(true);
    }
    console.log(editData);
  };

  const handleSaveEdit = () => {
    console.log(editData);
    axios
      .put(
        `http://localhost:8085/admin/instructors/${editData.instructorId}/${editData.instructorName}/${editData.instructorContact}`,
        {
          instructorName: editData.instructorName,
          instructorContact: editData.instructorContact,
        }
      )
      .then((response) => {
        setInstructorData((prevData) =>
          prevData.map((instructor) =>
            instructor.instructor_id === editData.instructorId
              ? {
                  ...instructor,
                  instructor_name: editData.instructorName,
                  instructor_contact: editData.instructorContact,
                }
              : instructor
          )
        );
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error updating instructor data:", error);
        setOpenEditDialog(false);
      });
  };

  const handleDelete = (instructorId) => {
    axios
      .delete(`http://localhost:8085/admin/instructors/${instructorId}`)
      .then((response) => {
        setInstructorData((prevData) =>
          prevData.filter(
            (instructor) => instructor.instructor_id !== instructorId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting instructor data:", error);
      });
  };

  return (
    <card className="App-card">
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
            {instructorData.map((instructor, index) => (
              <TableRow key={instructor.instructorId}>
                <TableCell style={{ padding: "10px" }}>{index + 1}</TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructor_id}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructor_name}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructor_contact}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(instructor.instructor_id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(instructor.instructor_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Instructor</DialogTitle>
        <DialogContent>
          <TextField
            label="Instructor Name"
            value={editData.instructorName}
            onChange={(e) =>
              setEditData({ ...editData, instructorName: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Instructor Contact"
            value={editData.instructorContact}
            onChange={(e) =>
              setEditData({ ...editData, instructorContact: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </card>
  );
};

export default Instructor;
