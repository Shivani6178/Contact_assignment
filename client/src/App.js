import React, { useState, useRef } from "react";
import ContactTable from "./components/ContactTable";
import ContactModal from "./components/ContactModal";
import AddContactButton from "./components/AddContactButton";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const tableRef = useRef();

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleContactsUpdate = () => {
    if (tableRef.current) {
      tableRef.current.fetchData();
    }
  };

  return (
    <div className="App">
      <AddContactButton onClick={handleAdd} />
      <ContactTable
        onEdit={handleEdit}
        ref={tableRef}
      />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contactData={selectedContact}
        onContactsUpdate={handleContactsUpdate}
      />
    </div>
  );
}

export default App;
