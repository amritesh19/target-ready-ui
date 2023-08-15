import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useAlert } from "../AlertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const alert = useAlert();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Role:", role, "ID:", id);

    try {
      const response = await axios.get(
        `http://localhost:8087/login/${role}/${id}`
      );
      //console.log(response);
      alert.showAlertWithMessage(response.data, "success");
      const userData = { role, id };
      login(userData);
      navigate("/calendar");
    } catch (error) {
      //console.log(error);
      alert.showAlertWithMessage(error.response.data.error, "error");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role *</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="ID"
              variant="outlined"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
