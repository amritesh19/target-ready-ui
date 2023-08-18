import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { TabList } from "@mui/lab";
import axios from "axios";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    CardContent,
    Modal,
    Typography,
    IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import "./index.css";
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAlert } from "../AlertContext";

const CustomTableContainer = styled(TableContainer)({
    maxWidth: 900,
    margin: "auto",
    marginTop: "16px",
    width: 1900,
    height: 400,
    marginLeft: "-20%",
    overflow: "auto",
  });
  

const AdminWeeklyView = () => {
  const alert = useAlert();
  const [newlist,setnewlist]=useState([]);
  const [selectedSubject,setSelectedSubject] = useState(null);
  const [selectedCellData, setSelectedCellData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [table,setTable]=useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [show,setShow] = useState(true);
  const subjectlist=[];

  const handleCellClick = (cellData) => {
    const uniqueSet = new Set(subjectlist);
    const uniqueArray = Array.from(uniqueSet);
    setnewlist(uniqueArray);
    setSelectedCellData(cellData);
    setOpenModal(true);
  };

  const handleCellClicks= (day,time)=>{
    let classId=localStorage.getItem('classid');
  
    console.log(day,time);
    axios
          .delete(`http://localhost:8087/time_table/${classId}/${day}/${time}`)
          .then((response) => {
      
            console.log(response);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      window.location.reload();
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const timeSlots = [
    "9:00am-10:00am",
    "10:00am-11:00am",
    "11:00am-12:00pm",
    "12:00pm-1:00pm",
    "1:00pm-2:00pm",
    "2:00pm-3:00pm",
    "3:00pm-4:00pm",
    "4:00pm-5:00pm",
  ];
    useEffect(() => {
        let classId = localStorage.getItem('classid');
        if(classId){
            fetchData(classId);
        }
    });

    const fetchData = async (classId) => {
      try{
        const response = await axios.get(`http://localhost:8087/time_table/student/${classId}`);
        setShow(true);
        setTable(response.data);
      }catch(error) {
        setShow(false);
        alert.showAlertWithMessage("No data found!", "error");
      };
    };

    const [changelocation,setchangelocation]= useState('');

    const locationchange = (e) =>{
         setchangelocation(e.target.value)
    }

    const handleEdit = () => {
      setOpenEditDialog(true);
    }

    const onEditData=(week,slot,subject,location)=>{
      let classId=localStorage.getItem('classid');
      axios
            .put(`http://localhost:8087/time_table/${classId}/${week}/${slot}/${subject}/${location}`)
            .then((response) => {
        
              window.location.reload();
            })
            .catch((error) => {

              // Add the alert here @BINDU 

              alert(error.response.data.error);
              // console.error(error.response.data.error);
            }); 
    }

    return(
        <div>
        { show &&(
            <CustomTableContainer>
                
            <Table>
            <TableHead>
            <TableRow>
                <TableCell id="bold">Time Slot</TableCell>
                {timeSlots.map((slot) => (
                <TableCell key={slot}>{slot}</TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {days.map((day) => (
                <TableRow key={day}>
                <TableCell id="bold">{day}</TableCell>
                {timeSlots.map((slot) => {
                    const cellData = table.find(
                    (item) => item.week === day && item.slot === slot
                    );
                    let message;
                    if (cellData) {
                      {subjectlist.push(cellData.courseName)}
                      message = <p>{cellData.courseName}</p>;
                    }
                    else if(slot==="12:00pm-1:00pm"){
                    message = <p>Lunch</p>;
                    }
                    else {
                    message = <p>Leisure</p>;
                    }
                    return (
                    <TableCell
                        key={`${slot}-${day}`}
                        onClick={() => handleCellClick(cellData)}
                    >
                        {message}
                        {/* {cellData ? cellData.courseName : "lunch"} */}
                    </TableCell>
                    );
                })}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CustomTableContainer>

        )}
        <Modal open={openModal} onClose={handleCloseModal}>
        <Card className="modal-card">
            <CardContent>
            <Typography variant="h6">
                Subject: {selectedCellData?.courseName}
                <IconButton
                     aria-label="edit"
                     onClick={() => handleEdit()}
                   >
                     <EditIcon />
                   </IconButton>
            </Typography>

            <Typography variant="body1">
                Day: {selectedCellData?.week}
            </Typography>
            <Typography variant="body1">
                Time: {selectedCellData?.slot}
            </Typography>
            <Typography variant="body1">{selectedCellData?.location}</Typography>
            <Button variant="outlined" onClick={() => handleCellClicks(selectedCellData?.week,selectedCellData?.slot)} startIcon={<DeleteIcon />}>
            Delete
            </Button>
                </CardContent>
            </Card>
        </Modal>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} PaperProps={{className: 'class-edit-dialog-box' }} >
         <DialogTitle>Edit class</DialogTitle>
         <DialogContent>
         <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select an Class</option>
        {newlist.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
           <TextField
             label="Location"
             value = {changelocation}
             onChange={locationchange}
             style={{ marginTop: '10px'}}
             fullWidth
           />
           
         </DialogContent>
         <DialogActions>
           <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
           <Button onClick={ () => onEditData(selectedCellData?.week,selectedCellData?.slot,selectedSubject,changelocation)

           }
            variant="contained" color="primary">
             Save
           </Button>
         </DialogActions>
       </Dialog>

    </div>
    )    
}
export default AdminWeeklyView;