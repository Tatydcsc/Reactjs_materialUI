import React from "react";
import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NavHeader() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <HomeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Turismo e diversão
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavHeader;
