import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { shadows } from "@mui/system";

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
        bgcolor: "#dda4d2",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderRadius: 1,
          bgcolor: "#e8c7e3",
          flex: "0 0 auto",
        }}
        display="flex"
        p={1}
        gap={117}
      >
        <Box>
          <Typography color="textPrimary">Korisnik: {username} </Typography>
          <Typography color="textPrimary">Email: {email}</Typography>
        </Box>

        <Button
          sx={{ boxShadow: "1" }}
          onClick={handleLogout}
          variant="outlined"
          startIcon={<LogoutIcon />}
        >
          Odjavi se
        </Button>
      </Box>
      <Box
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
        }}
        alignSelf="center"
        pt={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPage;
