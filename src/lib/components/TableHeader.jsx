import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TableHeader = ({ column, sortBy, sortOrder, onClick }) => {
  return (
    <th
      onClick={onClick}
      className={`${sortBy === column.key ? "sorted-column" : ""}`}
    >
      <div className="flex-jcc-aic">
        {column.label}
        {column.key && ( // Si la clé est présente, afficher les icônes
          <span className="up-down">
            <FaCaretUp
              className={
                sortBy === column.key && sortOrder === "asc"
                  ? "sorted-icon"
                  : ""
              }
            />
            <FaCaretDown
              className={
                sortBy === column.key && sortOrder === "desc"
                  ? "sorted-icon"
                  : ""
              }
            />
          </span>
        )}
      </div>
    </th>
  );
};

export default TableHeader;
