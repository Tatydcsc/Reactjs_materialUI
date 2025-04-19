import * as React from "react";
import Button from "@mui/material/Button";

function CustomButton({ children, variant = "contained", color = "primary", ...props }) {
  return (
    <Button variant={variant} color={color} {...props}>
      {children}
    </Button>
  );
}

export default CustomButton; 