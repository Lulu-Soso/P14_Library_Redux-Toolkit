import React from "react";
import SuperTable from "../lib/components/SuperTable";
import { Link } from "react-router-dom";

const AppTestLibrary = () => {
  const customLabelFilter = "Show"
  const customLabelSearch = "Search"

  return (
    <div className="app-container">
      <h1>Table Library</h1>

      <SuperTable 
      showFilterComponent={true}
      showSearchComponent={true}
      showEntriesListComponent={true}
      showPaginationComponent={true}
      customLabelFilter={customLabelFilter} 
      customLabelSearch={customLabelSearch} 
      />

      <div className="link-employee">
        <Link to="/employees/create">Create Employee</Link>
      </div>
    </div>
  );
};

export default AppTestLibrary;
