import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface DashboardParams {
  children: any;
}

const DashboardPage = ({ children }: DashboardParams) => {
  const authContext = useContext(UserContext);

  const navigate = useNavigate();
  if (!authContext || !authContext.username || !authContext.email) {
    return null;
  }
  const { username, email } = authContext;

  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };

  return (
    <Box>
      <Box p={1} sx={{ border: "1px solid grey" }}>
        <Typography color="textPrimary">Usename: {username} </Typography>
        <Typography color="textPrimary">Email: {email}</Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default DashboardPage;
