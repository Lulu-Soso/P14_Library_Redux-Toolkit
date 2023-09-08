import React from 'react';

const EmployeeDataRow = ({ employee, sortBy, className }) => {
    const employeeEntries = Object.entries(employee);

    return (
        <tr className={className}>
            {employeeEntries.map(([key, value]) => {
                if (key !== "id") {
                    return (
                        <td key={key} className={sortBy === key ? "sorted-column" : ""}>
                            {value}
                        </td>
                    );
                }
                return null; // Return null for the 'id' key, so it doesn't get rendered
            })}
        </tr>
    );
};

export default EmployeeDataRow;
