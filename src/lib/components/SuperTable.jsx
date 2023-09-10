import React, { useEffect, useState } from "react";
import testData from "../../usersData.js"
import TableHeader from "../components/TableHeader";
import EmployeeDataRow from "../components/EmployeeDataRow";
import SearchField from "../components/SearchField";
import EntriesInfo from "../components/EntriesInfo";
import Pagination from "./Pagination";
import FilterEntries from "../components/FilterEntries";

// *** CONSTANTS ***
const columnsTable = [
  { key: "firstName", label: "First Name"},
  { key: "lastName", label: "Last Name"},
  { key: "email", label: "Email"},
  { key: "numberPhone", label: "Number Phone"},
  { key: "dateOfBirth", label: "Date of Birth"},
  { key: "address", label: "Address"},
  { key: "zipCode", label: "Zip Code"},
  { key: "", label: ""},
  { key: "country", label: "Country"},
]; 

const SuperTable = ({
  data = testData,
  customColumnsTable = columnsTable,
  showFilterComponent = false,
  showSearchComponent = false,
  // showEntriesListComponent = false,
  // showPaginationComponent = false,
  showEntriesListComponent: showEntriesListProp = true,
  showPaginationComponent: showPaginationProp = true,
  customLabelSearch = "Search data",
  customLabelFilter = "Show by Number",
}) => {
  // *** STATES ***
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [localShowEntriesListComponent, setLocalShowEntriesListComponent] =
    useState(showEntriesListProp);
  const [localShowPaginationComponent, setLocalShowPaginationComponent] =
    useState(showPaginationProp);

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

  // const sortedData = employeesData.slice().sort((a, b) => {
  const sortedData = data.slice().sort((a, b) => {
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
  // const paginatedData = sortedData
  //   .filter((employee) => {
  //     if (!searchValue) return true;
  //     return (
  //       employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.birthDate.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.startDate.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.street.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.city.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.state.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.zipCode.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       employee.department.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //   })
  //   .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const paginatedData = sortedData.filter((item) => {
    if (!searchValue) return true;
    const searchTerms = searchValue.toLowerCase().split(" ");
    return searchTerms.every((term) =>
      Object.values(item)
        .filter((value) => typeof value === "string")
        .some((value) => value.toLowerCase().includes(term))
    );
  })
  .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
    setSearchPerformed(true); // Marquez qu'une recherche a été effectuée
    // dispatch(setSearch(e.target.value));
  };

  const handleEntriesChange = (e) => {
    if (!showFilterComponent) return; // Si showFilterComponent est false, ne faites rien

    setEntriesToShow(+e.target.value);
    setCurrentPage(1); // Reset to page 1 on entries change
  };

  useEffect(() => {
    if (!showFilterComponent) {
      setLocalShowEntriesListComponent(false);
      setLocalShowPaginationComponent(false);
    } else {
      setLocalShowEntriesListComponent(showEntriesListProp);
      setLocalShowPaginationComponent(showPaginationProp);
    }
  }, [showFilterComponent, showEntriesListProp, showPaginationProp]);

  const showAllData = !showFilterComponent;

  useEffect(() => {
    if (showAllData) {
      // setEntriesToShow(employeesData.length); // Affichez toutes les données
      setEntriesToShow(data.length); // Affichez toutes les données
    } else {
      setEntriesToShow(10); // Ou toute autre valeur par défaut que vous souhaitez utiliser
    }
  // }, [employeesData, showAllData]);
  }, [data, showAllData]);

  return (
    <div className="app-container">
      <div className="employees-header">
        <div className="show-search">
          {showFilterComponent && (
            <FilterEntries
              entriesToShow={entriesToShow}
              handleEntriesChange={handleEntriesChange}
              customLabelFilter={customLabelFilter}
            />
          )}

          {showSearchComponent && (
            <SearchField
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
              customLabelSearch={customLabelSearch}
            />
          )}
        </div>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            {/* {columns.map((column) => ( */}
            {customColumnsTable.map((column) => (
              <TableHeader
                // key={column.key}
                key={column.key || Math.random()} // Si la clé est vide, nous générons un identifiant aléatoire. Ceci évitera des problèmes avec React.
                column={column}
                sortBy={sortBy}
                sortOrder={sortOrder}
                // onClick={() => handleColumnClick(column.key)} // Ici, on passe le nom de la colonne
                onClick={column.key ? () => handleColumnClick(column.key) : undefined} // Pas de gestionnaire de clic si la clé est vide
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
              customColumnsTable={customColumnsTable} // Passer le tableau customColumnsTable en tant que prop
            />
          ))}
        </tbody>
      </table>

      {searchPerformed && paginatedData.length === 0 ? (
        <div className="error-message">
          <p>No results found for your search.</p>
        </div>
      ) : (
        <div className="flex-pagination">
          {localShowEntriesListComponent && (
            <EntriesInfo
              currentPage={currentPage}
              entriesToShow={entriesToShow}
              totalEntries={totalEntries}
            />
          )}
          {localShowPaginationComponent && (
            <Pagination
              handlePageClick={handlePageClick}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              pageNumbers={pageNumbers}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SuperTable;
