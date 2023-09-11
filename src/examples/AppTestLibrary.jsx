import React, { useEffect } from "react";
import axios from "axios";
import SuperTable from "../lib/components/SuperTable";
import {
  setEmployeesData,
  setError,
  updateEmployee,
} from "../feature/employees.slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// *** CONSTANTS ***
const columnsTable = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "birthDate", label: "Date of Birth" },
  { key: "startDate", label: "Start Date" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
  { key: "department", label: "Department" },
  { key: "/Options-Actions/", label: "Actions" },
];

const AppTestLibrary = () => {
  const customLabelFilter = "Show";
  const customLabelSearch = "Search";

  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  // *** DATA FETCHING ***
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        dispatch(setEmployeesData(response.data));
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        dispatch(setError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const customHandleSaveEditForm = async (item) => {
    try {
      console.log("Saving edited employee:", item);

      const response = await axios.put(
        `http://localhost:5000/employees/${item.id}`,
        item
      );

      console.log("Edit response:", response.data);
      dispatch(updateEmployee(item));
      //   dispatch({ type: "SET_FORM_DATA", payload: response.data });
    } catch (error) {
      console.error("An error occurred while editing employee:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Table Library</h1>

      <SuperTable
        // data={employeesData}
        // columnsTable={columnsTable}
        showFilterComponent={true}
        showSearchComponent={true}
        showEntriesListComponent={true}
        showPaginationComponent={true}
        customLabelFilter={customLabelFilter}
        customLabelSearch={customLabelSearch}
        readComponent={true}
        editComponent={true}
        deleteComponent={true}
        customHandleSaveEditForm={customHandleSaveEditForm}
        // customHandleRead={customHandleRead}
        // customHandleEdit={customHandleEdit}
        // customHandleDelete={customHandleDelete}
      />

      <div className="link-employee">
        <Link to="/employees/create">Create Employee</Link>
      </div>
    </div>
  );
};

export default AppTestLibrary;
