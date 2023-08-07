import { Card } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Login from "../Login";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <div>
          <center>
            <h1>Welcome, {user.role} Anand!</h1>
          </center>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
export default Home;
