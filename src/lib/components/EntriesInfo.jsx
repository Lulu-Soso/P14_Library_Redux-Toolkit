import React from "react";

const EntriesInfo = ({ currentPage, entriesToShow, totalEntries }) => {
  return (
    <>
      {totalEntries === 0 ? (
        <div> </div>
      ) : (
        <div className="entries">
          <span>
            {(currentPage - 1) * entriesToShow + 1} {"..."}{" "}
            {Math.min(currentPage * entriesToShow, totalEntries)}
          </span>
          <p>{totalEntries}</p>
        </div>
      )}
    </>
  );
};

export default EntriesInfo;
