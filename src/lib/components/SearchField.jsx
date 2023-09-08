import React from 'react';

const SearchField = ({ searchValue, handleSearchChange, customLabelSearch }) => {
    return (
        <div className="search">
            <label htmlFor="search">{customLabelSearch}</label>
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
