import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { DeleteOutline, Edit } from "@mui/icons-material";
import axios from "axios";

const ContactTable = forwardRef(({ onEdit }, ref) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/contacts");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  const handleDelete = async (rowData) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`http://localhost:8080/api/contacts/${rowData._id}`);
        fetchData(); 
      } catch (error) {
        console.error("Error deleting contact:", error.message);
      }
    }
  };

  const columns = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Company", field: "company" },
    { title: "Job Title", field: "jobTitle" },
  ];

  const options = {
    sorting: true,
    pagination: true,
    pageSize: 5,
    paginationType: "normal",
    rowStyle: { backgroundColor: "#EEE" },
    headerStyle: { backgroundColor: "#3f51b5", color: "#FFF" },
  };

  return (
    <MaterialTable
      title="Contact List"
      columns={columns}
      data={tableData}
      isLoading={loading}
      options={options}
      actions={[
        {
          icon: () => <Edit />,
          tooltip: "Edit Contact",
          onClick: (event, rowData) => onEdit(rowData),
        },
        {
          icon: () => <DeleteOutline />,
          tooltip: "Delete Contact",
          onClick: (event, rowData) => handleDelete(rowData),
        },
      ]}
    />
  );
});

export default ContactTable;
