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
} from "@mui/material";
import { UserContext } from "../UserContext";

const Login = () => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const { user, login } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Role:", role, "ID:", id);

    const userData = { role, id };
    login(userData);
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
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Instructor">Instructor</MenuItem>
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
