import React from "react";

const EditForm = ({
  columnsTable,
  handleSaveEditForm,
  closeEditForm,
  editedItem,
  handleFieldChange,
  isValidEmail,
  isValidPhoneNumber,
}) => {
  return (
    <>
      {/* <h2>Edit Page</h2> */}
      <form>
        {columnsTable
          .filter((column) => column.key !== "/Options-Actions/") // Exclure la colonne d'options
          .map((column) => (
            <div key={column.key} className="editField">
              <label>{column.label} </label>
              {
                column.type === "text" ||
                column.type === "email" ||
                column.type === "number" ||
                column.type === "tel" ? (
                  <input
                    type={column.type}
                    value={editedItem[column.key] || ""}
                    onChange={(e) =>
                      handleFieldChange(column.key, e.target.value)
                    }
                  />
                  ) : column.type === "textarea" ? (
                    <textarea
                      value={editedItem[column.key] || ""}
                      onChange={(e) =>
                        handleFieldChange(column.key, e.target.value)
                      }
                    ></textarea>
                ) : column.type === "date" ? (
                  <input
                    type="date"
                    value={editedItem[column.key] || ""}
                    onChange={(e) =>
                      handleFieldChange(column.key, e.target.value)
                    }
                  />
                ) : column.type ===
                  "password" ? null : /* Gérer d'autres types de champs ici si nécessaire */ null // Ne pas afficher de champ de mot de passe
              }

              {column.required && !editedItem[column.key] && (
                <div className="error-message">This field is required.</div>
              )}

              {column.type === "email" &&
                editedItem[column.key] &&
                !isValidEmail(editedItem[column.key]) && (
                  <div className="error-message">Invalid email format.</div>
                )}

              {column.type === "number" &&
                editedItem[column.key] &&
                isNaN(editedItem[column.key]) && (
                  <div className="error-message">
                    Please enter a valid number.
                  </div>
                )}

              {column.type === "tel" &&
                editedItem[column.key] &&
                !isValidPhoneNumber(editedItem[column.key]) && (
                  <div className="error-message">
                    Invalid phone number format.
                  </div>
                )}
            </div>
          ))}
        <button type="button" className="btn-edit-form" onClick={handleSaveEditForm}>
          Save
        </button>
        <button type="button" className="btn-edit-form" onClick={closeEditForm}>Cancel</button>
      </form>
    </>
  );
};

export default EditForm;
