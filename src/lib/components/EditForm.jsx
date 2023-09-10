import React from "react";

const EditForm = ({ saveEditedItem, closeEditForm }) => {
  return (
    <>
      <h2>Edit Page</h2>
      <form>
        <button type="button" onClick={saveEditedItem}>
          Save
        </button>
        <button onClick={closeEditForm}>Cancel</button>
      </form>
    </>
  );
};

export default EditForm;
