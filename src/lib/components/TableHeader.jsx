import React from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TableHeader = ({ column: { key, label }, sortBy, sortOrder, onClick }) => {
    const isSortedColumn = sortBy === key;

    // Ici, on détermine la classe en fonction de la clé
    let columnClass = 'title-column';
    if (!key) columnClass += ' empty-column';
    if (isSortedColumn) columnClass += ' sorted-column';
    if (key === "/Options-Actions/") columnClass += ' actions-th';

    return (
      <th
        onClick={onClick}
        className={columnClass}
      >
        <div className="flex-jcc-aic">
          {label}
          {(key && key !== "/Options-Actions/") && (
            <span className="up-down">
              <FaCaretUp
                className={isSortedColumn && sortOrder === "asc" ? "sorted-icon" : ""}
              />
              <FaCaretDown
                className={isSortedColumn && sortOrder === "desc" ? "sorted-icon" : ""}
              />
            </span>
          )}
        </div>
      </th>
    );
};

export default TableHeader;
