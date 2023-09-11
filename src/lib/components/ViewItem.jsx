import React from "react";

const ViewItem = ({ item, columnsTable }) => {
  return (
    <>
      {columnsTable.map((column) => (
        <div className="itemDetail" key={column.key}>
          <div className="key-item">
            <strong>{column.label}</strong>
          </div>
          <div className="value-item">{item[column.key]}</div>
        </div>
      ))}
    </>
  );
};

export default ViewItem;
