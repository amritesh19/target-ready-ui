import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { UserContext } from "../UserContext";
import Login from "../Login";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 400,
  maxWidth: 800,
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minWidth: 400,
  maxWidth: 600,
  marginBottom: theme.spacing(3),
}));

const Home = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8087/${user.role}s/${user.id}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const renderUserData = () => {
    let fieldRows = [];
    for (let [field, value] of Object.entries(userData)) {
      fieldRows.push(
        <TableRow key={field}>
          <TableCell>
          {field.includes('classId') ? (
                field = 'Class ID'
              ) : field.includes('Name') ? (
                field = 'Name'
              ) : field.includes('Contact') ?(
                field = 'Contact'
              ):field.includes('Id')?(
              field = 'ID'
              ):''
          }
          </TableCell>
          <TableCell>{value}</TableCell>
        </TableRow>
      );
    }

    return (
      <center>
        <StyledTableContainer>
          <Table>
            <TableBody>{fieldRows}</TableBody>
          </Table>
        </StyledTableContainer>
      </center>
    );
  };

  return (
    <div>
      {user ? (
        <center>
          <StyledPaper elevation={3}>
            <StyledTypography variant="h3" align="center">
              Welcome, {user.role === "admin" && userData.adminName}
              {user.role === "instructor" && userData.instructorName}
              {user.role === "student" && userData.studentName}!
            </StyledTypography>
            {renderUserData()}
          </StyledPaper>
        </center>
      ) : (
        <Login />
      )}
    </div>
  );
};
export default Home;