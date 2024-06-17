import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface DashboardParams {
  children: any;
}

const DashboardPage = ({ children }: DashboardParams) => {
  const authContext = useContext(UserContext);

  const navigate = useNavigate();
  if (!authContext || !authContext.username || !authContext.email) {
    return null;
  }

  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
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
          bgcolor: "#dda4d2",
          flex: "0 0 auto",
        }}
        display="flex"
        p={1}
        gap={137}
      >
        <Box>
          <Button
            sx={{ bgcolor: "#e4bfdb", boxShadow: "1" }}
            variant="outlined"
            onClick={handleProfile}
            startIcon={<AccountBoxIcon />}
          >
            Profil
          </Button>
        </Box>

        <Button
          sx={{ bgcolor: "#e4bfdb", boxShadow: "1" }}
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
