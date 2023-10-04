import React, { useEffect } from "react";
import axios from "axios";
import SuperTable from "../lib/components/SuperTable";
import {
  setEmployeesData,
  setError,
  updateEmployee,
  deleteEmployee
} from "../feature/employees.slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// *** CONSTANTS ***
const columnsTable = [
  // { key: "id", label: "id", type: "number"},
  { key: "firstName", label: "First Name", type: "text"},
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "birthDate", label: "Date of Birth", type: "date" },
  { key: "startDate", label: "Start Date", type: "date" },
  { key: "street", label: "Street", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "state", label: "State", type: "text" },
  { key: "zipCode", label: "Zip Code", type: "number" },
  { key: "department", label: "Department", type: "text"},
  // { key: "createAt", label: "Create At", type: "text"},
  { key: "/Options-Actions/", label: "Actions" },
];

const AppTestLibrary = () => {
  const customLabelFilter = "Filter and Display Pages";
  const customLabelSearch = "Search Filter";

  const employeesData = useSelector((state) => state.employees.employeesData);
  const dispatch = useDispatch();

  // *** DATA FETCHING ***
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        console.log(response.data);
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
      dispatch(updateEmployee(response.data));
    //   dispatch(setEmployeesData(response.data));
      //   dispatch({ type: "SET_FORM_DATA", payload: response.data });
    } catch (error) {
      console.error("An error occurred while editing employee:", error);
    }
  };

  const customHandleDelete = async (employeeId) => {
    try {
      console.log("Deleting employee with ID:", employeeId);

      const response = await axios.delete(
        `http://localhost:5000/employees/${employeeId}`
      );

      console.log("Delete response:", response.data);
    //   localStorage.setItem("employeesData", JSON.stringify(response.data));
      dispatch(deleteEmployee(employeeId));
    } catch (error) {
      console.error("An error occurred while deleting employee:", error);
    }
  };

  return (
    <div className="app-container">
      {/* <h1>Table Library</h1> */}

      <SuperTable
        data={employeesData}
        columnsTable={columnsTable}
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
        customHandleDelete={customHandleDelete}
      />

      <div className="link-employee">
        <Link to="/employees/create">Create Employee</Link>
      </div>
    </div>
  );
};

export default AppTestLibrary;
