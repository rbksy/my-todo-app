import React from 'react';
import Modal from 'react-modal';
import './App.css';

const TaskModal = ({ isOpen, onClose, onSave, taskText, setTaskText }) => {
  const handleSave = () => {
    onSave();
    setTaskText('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h3>Edit Task</h3>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="modal-input"
        placeholder="Edit task"
      />
      <div className="modal-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default TaskModal;
