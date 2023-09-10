import React from 'react';

const EmployeeDataRow = ({ employee, sortBy, className, customColumnsTable }) => (
    <tr className={className}>
        {customColumnsTable.map(column => {
            const { key } = column;

            if (!key) return <td key={`empty_${Math.random()}`} className="empty-column"></td>;
            if (key === "id") return null;
            
            return (
                <td key={key} className={sortBy === key ? "sorted-column" : ""}>
                    {employee[key]}
                </td>
            );
        })}
    </tr>
);

export default EmployeeDataRow;
