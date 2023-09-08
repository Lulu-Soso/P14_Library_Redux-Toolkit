import React from 'react';

const SearchField = ({ searchValue, handleSearchChange }) => {
    return (
        <div className="search">
            <label htmlFor="search">Search:</label>
            <input
                id="search"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchField;
