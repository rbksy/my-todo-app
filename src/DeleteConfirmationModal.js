import React from 'react';
import './App.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this task?</p>
          <div className="modal-actions">
            <button className="save-btn" onClick={onConfirm}>Delete</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default DeleteConfirmationModal;
