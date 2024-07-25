import React, { useState } from 'react';
import './App.css';
import { FaSearch, FaStar, FaTrash, FaPlus, FaEdit, FaCalendarAlt, FaClock } from 'react-icons/fa';
import TaskModal from './TaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAdd = () => {
    if (task) {
      const newTask = { text: task, completed: false, important: false, dueDate, dueTime };
      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, index) =>
          index === editIndex ? newTask : t
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setModalIsOpen(false);
      } else {
        setTasks([...tasks, newTask]);
      }
      setTask('');
      setDueDate('');
      setDueTime('');
    }
  };

  const handleDelete = (index) => {
    setTaskToDelete(index);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((_, index) => index !== taskToDelete);
    setTasks(updatedTasks);
    setDeleteModalIsOpen(false);
    setTaskToDelete(null);
  };

  const handleEdit = (index) => {
    const taskToEdit = tasks[index];
    setEditIndex(index);
    setTask(taskToEdit.text);
    setDueDate(taskToEdit.dueDate);
    setDueTime(taskToEdit.dueTime);
    setModalIsOpen(true);
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t, index) =>
      index === editIndex ? { ...t, text: task, dueDate, dueTime } : t
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setModalIsOpen(false);
    setTask('');
    setDueDate('');
    setDueTime('');
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleImportant = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter(task =>
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed)
    )
    .filter(task =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="App">
      <h2>Welcome to your To Do List!</h2> {/* Welcome message */}
      <div className="input-container">
        <div className="input-row">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Add or edit a task"
            className="task-input"
          />
          <button className="add-btn" onClick={handleAdd}>
            <FaPlus />
          </button>
        </div>
        <div className="date-time-container">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="time-input"
          />
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-btn" onClick={() => setFilter('all')}>All</button>
        <button className="filter-btn" onClick={() => setFilter('completed')}>Completed</button>
        <button className="filter-btn" onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <div className="status-bar">
        <span>{completedTasks}/{totalTasks} completed</span>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : 'pending'}>
            <div className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
                className="task-checkbox"
              />
              <span className="task-text">{task.text}</span>
              {task.dueDate && (
                <span className="task-date">
                  <FaCalendarAlt className="icon" /> {task.dueDate} 
                  {task.dueTime && (
                    <>
                      <FaClock className="icon" /> {task.dueTime}
                    </>
                  )}
                </span>
              )}
              <button 
                className={`important-btn ${task.important ? 'active' : ''}`}
                onClick={() => handleToggleImportant(index)}
              >
                <FaStar />
              </button>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
          className="search-input"
        />
        <button className="search-icon">
          <FaSearch />
        </button>
      </div>

      <TaskModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSave={handleSave}
        taskText={task}
        setTaskText={setTask}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;
