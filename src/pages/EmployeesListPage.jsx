import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeesData,
  setError,
  setSearch,
} from "../feature/employees.slice";
import TableHeader from "../components/TableHeader";
import EmployeeDataRow from "../components/EmployeeDataRow";
import ShowEntries from "../components/FilterEntries";
import SearchField from "../components/SearchField";
import EntriesInfo from "../components/EntriesInfo";
import Paginate from "../components/Paginate";

// *** CONSTANTS ***
const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "birthDate", label: "Date of Birth" },
  { key: "startDate", label: "Start Date" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
  { key: "department", label: "Department" },
];

const EmployeesListPage = () => {
  // *** STATES ***
  const [showEmptySearch, setShowEmptySearch] = useState(false);
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

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

  // *** SORTING LOGIC ***
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleColumnClick = (columnName) => {
    if (sortBy === columnName) {
      toggleSortOrder();
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const sortedData = employeesData.slice().sort((a, b) => {
    if (sortBy === null) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Check for undefined or null values
    if (aValue == null || bValue == null) return 0;

    if (typeof aValue === "string" && typeof bValue === "string") {
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      // Handle non-string values, assuming they're numbers or other sortable types
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  // *** PAGINATION LOGIC ***
  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  function getPageNumbers(totalPages, currentPage, pagesToShow = 5) {
    const halfWay = Math.ceil(pagesToShow / 2);

    // Déterminer les limites de départ et de fin pour la pagination
    let startPage = currentPage - halfWay + 1;
    let endPage = currentPage + halfWay - 1;

    // Si startPage est négatif ou zéro
    if (startPage <= 0) {
      endPage -= startPage - 1;
      startPage = 1;
    }

    // Si endPage dépasse totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // Si après avoir fixé endPage, startPage est toujours négatif ou zéro
    if (endPage - pagesToShow + 1 > 0) {
      startPage = endPage - pagesToShow + 1;
    }

    // Générer les numéros de page
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ajouter la première et la dernière page si elles ne sont pas déjà présentes
    if (startPage !== 1) pages.unshift(1);
    if (endPage !== totalPages && totalPages !== 1) pages.push(totalPages);

    return pages;
  }

  // *** SEARCH AND FILTER LOGIC ***
  const paginatedData = sortedData
    .filter((employee) => {
      if (!searchValue) return true;
      return (
        employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.birthDate.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.startDate.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.street.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.state.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.zipCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
    dispatch(setSearch(e.target.value));
  };

  const handleEntriesChange = (e) => {
    setEntriesToShow(+e.target.value);
    setCurrentPage(1); // Reset to page 1 on entries change
  };

  useEffect(() => {
    if (paginatedData.length === 0) {
      setShowEmptySearch(true);
    } else {
      setShowEmptySearch(false);
    }
  }, [paginatedData]);

  return (
    <div className="app-container">
      <div className="employees-header">
        <h2>Current Employees</h2>
        <div className="show-search">
          <ShowEntries
            entriesToShow={entriesToShow}
            handleEntriesChange={handleEntriesChange}
          />

          <SearchField
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
          />
        </div>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader
                key={column.key}
                column={column}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onClick={() => handleColumnClick(column.key)} // Ici, on passe le nom de la colonne
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((employee, index) => (
            <EmployeeDataRow
              key={employee.id}
              employee={employee}
              sortBy={sortBy}
              className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}
            />
          ))}
        </tbody>
      </table>

      {showEmptySearch && (
        <div className="error-message">
          <p>No results found for your search.</p>
        </div>
      )}

      <div className="flex-pagination">
        <EntriesInfo
          currentPage={currentPage}
          entriesToShow={entriesToShow}
          totalEntries={totalEntries}
        />

        <Paginate
          handlePageClick={handlePageClick}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          pageNumbers={pageNumbers}
          currentPage={currentPage}
        />
      </div>
      <div className="link-employee">
        <Link to="/employees/create">Create Employee</Link>
      </div>
    </div>
  );
};

export default EmployeesListPage;
