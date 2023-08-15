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
import './index.css';
import { useAlert } from "../AlertContext";

const tableStyles = {
    maxWidth: 900,
    margin: "auto",
    marginTop: "100px",
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
  top: "15%",
  padding: "10px",
  boxShadow: "0px 0.5px 1px",
};
const buttonStyle ={
    position:"absolute",
    left: "68%",
    top: "18%",
    padding: "5px",
    boxShadow: "0px 0.5px 1px",
}

const Instructor = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newInstructorData, setNewInstructorData] = useState([]);
  const [contactErrorText, setContactErrorText] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const alert = useAlert();
  const [editData, setEditData] = useState({
    instructorId: "",
    instructorName: "",
    instructorContact: "",
  });

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    try{
      axios
      .get("http://localhost:8087/instructors")
      .then((response) => {
        console.log(response.data);
        setInstructorData(response.data);
        console.log(instructorData);
      })
    }catch(error) {
        console.error("Error fetching instructor data:", error);
    };
  };

  const handleEdit = (instructorId) => {
    const instructor = instructorData.find(
      (instructor) => instructor.instructorId === instructorId
    );
    if (instructor) {
      setEditData({
        instructorId: instructor.instructorId,
        instructorName: instructor.instructorName,
        instructorContact: instructor.instructorContact,
      });
      setOpenEditDialog(true);
    }
    console.log(editData);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    console.log(editData);
    try{
         const response = await axios.put(
           `http://localhost:8087/instructors/${editData.instructorId}/${editData.instructorName}/${editData.instructorContact}`,
            {
              instructorName: editData.instructorName,
              instructorContact: editData.instructorContact,
            }
         );
         setInstructorData((prevData) =>
          prevData.map((instructor) =>
            instructor.instructorId === editData.instructorId
              ? {
                  ...instructor,
                  instructorName: editData.instructorName,
                  instructorContact: editData.instructorContact,
                }
              : instructor
            )
          );
          setOpenEditDialog(false);
          alert.showAlertWithMessage(response.data, "success");
    }catch(error){
      setContactErrorText("Contact already exists!");
      console.error("Error updating instructor data:", error);
      setOpenEditDialog(false);
    };
  };

  const handleAdd = () => {
    setOpenAddDialog(true);
  };

  const handleSaveAdd = () => {
        console.log("hi");
        console.log(newInstructorData);
        console.log("hi");
        axios
          .post(
            `http://localhost:8087/instructors/${newInstructorData.instructorName}/${newInstructorData.instructorContact}`,
            {
              instructorName: newInstructorData.instructorName,
              instructorContact: newInstructorData.instructorContact,
            }
          )
          .then((response) => {
            console.log(response);
            fetchData();
           // setStatus({ type: 'success' });
            setOpenAddDialog(false);
            alert.showAlertWithMessage(response.data, "success");
          })
          .catch((error) => {
            console.error("Error adding instructor data:", error);
            setOpenAddDialog(false);
          });
      };

  const handleDelete = (instructorId) => {
    axios
      .delete(`http://localhost:8087/instructors/${instructorId}`)
      .then((response) => {
        setInstructorData((prevData) =>
          prevData.filter(
            (instructor) => instructor.instructorId !== instructorId
          )
        );
        alert.showAlertWithMessage(response.data, "success");
      })
      .catch((error) => {
        console.error("Error deleting instructor data:", error);
      });
  };

  return (
    <card className="App-card">
      <div>
      <div style={headingStyle}>LIST OF INSTRUCTOR</div>
      </div>
      <Button style={buttonStyle} onClick={() => handleAdd()}>Add New Instructor</Button>
      <TableContainer component={Paper} style={tableStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={titleStyles}>Serial Number</TableCell>
              <TableCell style={titleStyles}>Instructor ID</TableCell>
              <TableCell style={titleStyles}>Instructor Name</TableCell>
              <TableCell style={titleStyles}>Instructor Contact</TableCell>
              <TableCell style={titleStyles}>Update/Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructorData.map((instructor, index) => (
              <TableRow key={instructor.instructorId}>
                <TableCell style={{ padding: "10px" }}>{index + 1}</TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructorId}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructorName}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  {instructor.instructorContact}
                </TableCell>
                <TableCell style={{ padding: "10px" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(instructor.instructorId)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(instructor.instructorId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} PaperProps={{className: 'instructor-dialog-box' }} >
        <DialogTitle>Edit Instructor</DialogTitle>
        <DialogContent>
          <TextField
            label="Instructor Name"
            value={editData.instructorName}
            onChange={(e) =>
              setEditData({ ...editData, instructorName: e.target.value })
            }
            style={{ marginBottom: '10px' ,marginTop: '10px'}}
            fullWidth
          />
          <TextField
            label="Instructor Contact"
            value={editData.instructorContact}
            onChange={(e) =>
              {
              setContactErrorText('');
              setEditData({ ...editData, instructorContact: e.target.value });
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

       <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} PaperProps={{ className: 'instructor-dialog-box' }}>
                  <DialogTitle>Add Instructor</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Instructor Name"
                      value={newInstructorData.instructorName}
                      onChange={(e) =>
                        setNewInstructorData({ ...newInstructorData, instructorName: e.target.value })
                      }
                      style={{ marginBottom: '10px' ,marginTop: '10px'}}
                      fullWidth
                    />

                    <TextField
                      label="Instructor Contact"
                      value={newInstructorData.instructorContact}
                      onChange={(e) =>
                        setNewInstructorData({ ...newInstructorData, instructorContact: e.target.value })
                      }
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button style={{alignItems: 'center'}} onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button style={{alignItems: 'center'}} onClick={handleSaveAdd} variant="contained" color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

    </card>
  );
};

export default Instructor;
