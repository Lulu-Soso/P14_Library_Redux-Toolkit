import React from 'react';

const EntriesInfo = ({ currentPage, entriesToShow, totalEntries }) => {
    return (
        <div>
            Showing {(currentPage - 1) * entriesToShow + 1} to{" "}
            {Math.min(currentPage * entriesToShow, totalEntries)} of{" "}
            {totalEntries} entries
        </div>
    );
};

export default EntriesInfo;
