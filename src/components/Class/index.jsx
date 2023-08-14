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

// const dataStyle = {
//   padding: "10px",
// };
const headingStyle = {
  // border:'1px solid black',
  position: "absolute",
  left: "45%",
  top: "20%",
  padding: "10px",
  boxShadow: "0px 0.5px 1px",
};


const ClassInstance = () => {
 const [classData, setClassData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    classId: "",
    className: "",
    classSection: "",
    classStrength: "",
  });
 useEffect(() => {
     axios
       .get("http://localhost:8087/class")
       .then((response) => {
         console.log(response.data);
         setClassData(response.data);
         console.log(classData);
       })
       .catch((error) => {
         console.error("Error fetching class data:", error);
       });
   }, []);

   const handleEdit = (classId) => {
     const classInstance = classData.find(
       (classInstance) => classInstance.classId === classId
     );
     if (classInstance) {
       setEditData({
         classId: classInstance.classId,
         className: classInstance.className,
         classSection: classInstance.classSection,
         classStrength: classInstance.classStrength,
       });
       setOpenEditDialog(true);
     }
     console.log(editData);
   };

   const handleSaveEdit = () => {
     console.log(editData);
     axios
       .put(
         `http://localhost:8087/class/${editData.classStrength}`,
         {
           classStrength: editData.classStrength,
         }
       )
       .then((response) => {
         setClassData((prevData) =>
           prevData.map((classInstance) =>
             classInstance.classId === editData.classId
               ? {
                   ...classInstance,
                    classStrength: editData.classStrength,
                 }
               : classInstance
           )
         );
         setOpenEditDialog(false);
       })
       .catch((error) => {
         console.error("Error updating classInstance data:", error);
         setOpenEditDialog(false);
       });
   };

   const handleDelete = (classId) => {
     axios
       .delete(`http://localhost:8087/class/${classId}`)
       .then((response) => {
         setClassData((prevData) =>
           prevData.filter(
             (classInstance) => classInstance.classId !== classId
           )
         );
       })
       .catch((error) => {
         console.error("Error deleting class data:", error);
       });
   };
      return (
         <card classInstanceName="App-card">
           <div style={headingStyle}>LIST OF classes</div><br></br><br></br>
           <TableContainer component={Paper} style={tableStyles}>
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell style={titleStyles}>Serial Number</TableCell>
                   <TableCell style={titleStyles}>class ID</TableCell>
                   <TableCell style={titleStyles}>class Name</TableCell>
                   <TableCell style={titleStyles}>class Section</TableCell>
                   <TableCell style={titleStyles}>class Strength</TableCell>
                   <TableCell style={titleStyles}>Update/Delete</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {classData.map((classInstance, index) => (
                   <TableRow key={classInstance.classId}>
                     <TableCell style={{ padding: "10px" }}>{index + 1}</TableCell>
                     <TableCell style={{ padding: "10px" }}>
                       {classInstance.classId}
                     </TableCell>
                     <TableCell style={{ padding: "10px" }}>
                       {classInstance.className}
                     </TableCell>
                     <TableCell style={{ padding: "10px" }}>
                       {classInstance.classSection}
                     </TableCell>
                     <TableCell style={{ padding: "10px" }}>
                       {classInstance.classStrength}
                     </TableCell>
                     <TableCell style={{ padding: "10px" }}>
                       <IconButton
                         aria-label="edit"
                         onClick={() => handleEdit(classInstance.classId)}
                       >
                         <EditIcon />
                       </IconButton>
                       <IconButton
                         aria-label="delete"
                         onClick={() => handleDelete(classInstance.classId)}
                       >
                         <DeleteIcon />
                       </IconButton>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} PaperProps={{className: 'dialog-box' }} >
             <DialogTitle>Edit class</DialogTitle>
             <DialogContent>
               <TextField
                 label="Class Strength"
                 value={editData.classStrength}
                 onChange={(e) =>
                   {
                   setEditData({ ...editData, classStrength: e.target.value });
                   }
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

//      export default Instructor;
//   return (
//     <Card
//       classInstanceName="App-Card"
//       style={{
//         position: "absolute",
//         top: "40%",
//         left: "30%",
//         transform: "translate(0px,-50%)",
//       }}
//     >
//       <h3 style={{ border: "1px solid black", padding: "15px" }}>
//         List of classInstancees
//       </h3>
//       <div style={tableStyles}>
//         <table>
//           <thead>
//             <tr>
//               <th style={titleStyles}>Serial Number</th>
//               <th style={titleStyles}>classInstance ID</th>
//               <th style={titleStyles}>classInstance Name</th>
//               <th style={titleStyles}>classInstance Section</th>
//               <th style={titleStyles}>classInstance Strength</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classInstanceData.map((classInstanceInfo) => (
//               <tr key={classInstanceInfo.classInstanceId}>
//                 <td style={dataStyle}>{classInstanceInfo.serialNumber}</td>
//                 <td style={dataStyle}>{classInstanceInfo.classInstanceId}</td>
//                 <td style={dataStyle}>{classInstanceInfo.classInstanceName}</td>
//                 <td style={dataStyle}>{classInstanceInfo.classInstanceSection}</td>
//                 <td style={dataStyle}>{classInstanceInfo.classInstanceStrength}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   );
// };

export default ClassInstance;
