import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

const ContactModal = ({ isOpen, onClose, contactData, onContactsUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (contactData) {
      setFormData(contactData);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
    }
  }, [contactData]);

  const handleSave = async () => {
    try {
      if (formData._id) {
        await axios.put(
          `http://localhost:8080/api/contacts/${formData._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/api/contacts", formData);
      }
      onContactsUpdate();
      onClose();
    } catch (error) {
      console.error("Error saving contact:", error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" marginBottom={2}>
          {formData._id ? "Edit Contact" : "Add New Contact"}
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          style={{ marginTop: 20 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ContactModal;
