import React from "react";
import { FaPen, FaTrashCan, FaTableList } from "react-icons/fa6";

const EmployeeDataRow = ({
  item,
  sortBy,
  className,
  columnsTable,
  readComponent,
  editComponent,
  deleteComponent,
  handleEdit,
  handleDelete,
  handleRead
}) => (
  <tr className={className}>
    {columnsTable.map((column) => {
      const { key } = column;

      if (!key)
        return (
          <td key={`empty_${Math.random()}`} className="empty-column"></td>
        );

      // Si c'est la colonne d'options/actions
      if (key === "/Options-Actions/") {
        return (
          // <td key="actions">
          <td key="/Options-Actions/" className="actions-td">
            <div className="options-icons">
              {readComponent && (
                <button onClick={() => handleRead(item)}>
                  <FaTableList className="pen-trash-icons" />
                </button>
              )}
              {editComponent && (
                <button onClick={() => handleEdit(item)}>
                  <FaPen className="pen-trash-icons" />
                </button>
              )}
              {deleteComponent && (
                <button onClick={() => handleDelete(item)}>
                  <FaTrashCan className="pen-trash-icons" />
                </button>
              )}
            </div>
          </td>
        );
      }

      return (
        <td key={key} className={sortBy === key ? "sorted-column" : ""}>
          {item[key]}
        </td>
      );
    })}
  </tr>
);

export default EmployeeDataRow;
