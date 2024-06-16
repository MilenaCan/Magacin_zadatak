import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfilPage = () => {
  const authContext = useContext(UserContext);
  const navigate = useNavigate();

  if (!authContext || !authContext.username || !authContext.email) {
    return null;
  }

  const handleBack = () => {
    navigate("/magacin");
  };

  return (
    <Box
      sx={{
        bgcolor: "#dda4d2",
        height: "100vh",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography fontWeight={"fontWeightBold"} variant="h4">
        Profil korisnika
      </Typography>
      <Typography variant="body1" pt={4}>
        Dobro došli, {authContext.username}. Ovo je vaš korisnički nalog.
      </Typography>
      <Typography variant="body1" pb={1} pt={1}>
        Email: {authContext.email}
      </Typography>
      <Button
        onClick={handleBack}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ bgcolor: "#e4bfdb", boxShadow: "1" }}
      >
        Nazad
      </Button>
    </Box>
  );
};
export default ProfilPage;
