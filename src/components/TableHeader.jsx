import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const TableHeader = ({ column, sortBy, sortOrder, onClick }) => {
    return (
        <th
            onClick={onClick}
            className={`${sortBy === column.key ? "sorted-column" : ""}`}
        >
            <p className="flex-jcc-aic">
                {column.label} {/* This line is changed */}
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
            </p>
        </th>
    );
};

export default TableHeader;
