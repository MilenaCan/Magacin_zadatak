import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Box, Typography } from "@mui/material";

interface Dashboardparams {
  children: any;
}

const DashboardPage = ({ children }: Dashboardparams) => {
  const authContext = useContext(UserContext);

  if (!authContext || !authContext.username || !authContext.email) {
    return null;
  }
  const { username, email } = authContext;

  return (
    <Box>
      <Box p={1} sx={{ border: "1px solid grey" }}>
        <Typography color="textPrimary">Usename: {username} </Typography>
        <Typography color="textPrimary">Email: {email}</Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default DashboardPage;
