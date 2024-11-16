
# Contact Management Application

## Overview

The **Contact Management Application** is a web-based tool that allows users to add, edit, and delete contacts. It enables users to manage important contact details such as names, emails, phone numbers, companies, and job titles. The application interacts with a backend API to persist contact information in a database and displays the contacts in a user-friendly interface.

---

## Major Technical Decisions

- **Frontend Framework**: React was chosen for its flexibility and component-based structure, which makes it easy to manage state and UI. It is suitable for building interactive UIs like this contact management system.

- **UI Framework**: Material-UI (MUI) was used for styling the application. MUI provides pre-built components like tables, modals, and buttons that are easy to implement and customize.

- **API Requests**: Axios was used for HTTP requests to interact with the backend API. This allows smooth communication between the frontend and backend for creating, reading, updating, and deleting contacts.

- **State Management**: React's `useState` and `useEffect` hooks are used to manage state and handle side effects like fetching data from the API or updating the UI when the contact list changes.

---

## Setup Instructions

### 1. Backend Setup

Ensure you have a running backend API to handle CRUD operations. Below is an example schema and Express server setup for MongoDB.

#### Database Schema (MongoDB - Mongoose)

```js
// contact.model.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);
```

1. **Install dependencies**:
   ```bash
   npm install express mongoose
   ```

2. **Run the server**:
   ```bash
   node index.js
   ```

### 2. Frontend Setup

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Run the frontend application:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view and interact with the app.

---

## How the App Works

### Components

- **ContactTable**:
  - Displays all the contacts in a tabular format.
  - Allows users to delete or edit contacts.

- **ContactModal**:
  - A modal used for both adding new contacts and editing existing ones. It takes the contact data as input and saves it via the backend API.
  
- **AddContactButton**:
  - A button that opens the modal for adding new contacts.

- **App**:
  - The main component that integrates the UI components and handles state management for contacts.

---

## Challenges and Solutions

### 1. **Managing State Across Multiple Components**
   - **Challenge**: Initially, managing state (contact data) across different components (ContactTable, ContactModal) was difficult. Modifying state in one component would not automatically reflect in other components.
   - **Solution**: I used React's `useState` and `useEffect` hooks to handle state and trigger UI updates when the contact list changes. By lifting state up to the parent component (`App.js`), I were able to manage the state centrally and pass it down to child components.

### 2. **Handling API Errors**
   - **Challenge**: Handling errors while interacting with the backend (e.g., when creating or updating contacts) was tricky as it required proper error handling mechanisms.
   - **Solution**: I implemented try-catch blocks around API calls in `ContactModal` to catch errors and display appropriate feedback to users if something went wrong during an API request.

### 3. **Refreshing the Contact List After Adding/Editing**
   - **Challenge**: After adding or editing a contact, the list was not automatically refreshed.
   - **Solution**: We used the `onContactsUpdate` function passed to `ContactModal` to refresh the contact list from the API after any changes. This ensures the frontend stays synchronized with the backend.

---
