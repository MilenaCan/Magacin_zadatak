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
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#ebeaea",
        display: "flex",
        flexDirection: "column",
      }}
      p={1}
    >
      <Box
        p={1}
        sx={{
          borderRadius: 1,
          bgcolor: "#ebeaea",
          flex: "0 0 auto",
        }}
      >
        <Typography color="textPrimary">Korisnik: {username} </Typography>
        <Typography color="textPrimary">Email: {email}</Typography>
        <Button onClick={handleLogout}>Odjavi se</Button>
      </Box>
      <Box
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
        }}
        pt={1}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPage;
