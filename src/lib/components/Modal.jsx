import React from "react";

const Modal = ({ isActiveModal, closeModal, children }) => {
  return (
    <div className={`modal ${isActiveModal ? "active" : ""}`}>
      <div className="modal-content">
        <div className="close-button">
        <button onClick={closeModal}>X
        </button>

        </div>
        <div className="children-content">
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;





