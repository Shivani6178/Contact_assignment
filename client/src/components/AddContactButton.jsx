import React from "react";
import { Button } from "@mui/material";

const AddContactButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      style={{ margin: "20px" }}
    >
      Add New Contact
    </Button>
  );
};

export default AddContactButton;
