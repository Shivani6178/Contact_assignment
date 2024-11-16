import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /contacts: Add a new contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /contacts: Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /contacts/:id: Update a contact by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /contacts/:id: Delete a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
