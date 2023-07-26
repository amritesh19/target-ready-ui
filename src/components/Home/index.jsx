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
          <h1>Welcome, {user.id}!</h1>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};
export default Home;
