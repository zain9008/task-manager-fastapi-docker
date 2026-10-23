import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTaskStatus, updateTaskContent, removeTask } from './api'; // API import ki
import './TasksPage.css'; // CSS import ki

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Tasks load nahi huay: ' + err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    try {
      await addTask(title, description);
      setTitle('');
      setDescription('');
      loadTasks();
    } catch (err) {
      setError('Task save nahi hua: ' + err.message);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await updateTaskStatus(task);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError('Update nahi hua: ' + err.message);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const saveEdit = async (task) => {
    if (!editTitle.trim()) return alert('Title is required');
    try {
      const updated = await updateTaskContent(task, editTitle, editDescription);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError('Edit save nahi hua: ' + err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await removeTask(id);
      loadTasks();
    } catch (err) {
      setError('Delete nahi hua: ' + err.message);
    }
  };

  return (
    <div className="tasks-container">
      <h2>🚀 React + FastAPI Task Manager</h2>

      <form onSubmit={createTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="btn btn-success">Add Task</button>
      </form>

      <h2>📋 Your Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks found. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            {editingId === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="task-input"
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ padding: '5px' }}
                />
              </div>
            ) : (
              <div>
                <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title}
                </strong>
                <p style={{ margin: '5px 0 0' }}>{task.description}</p>
              </div>
            )}

            <div>
              <button onClick={() => toggleComplete(task)} className="btn btn-info">
                {task.completed ? 'Undo' : 'Done'}
              </button>
              {editingId === task.id ? (
                <>
                  <button onClick={() => saveEdit(task)} className="btn btn-success">Save</button>
                  <button onClick={() => setEditingId(null)} className="btn btn-secondary">Cancel</button>
                </>
              ) : (
                <button onClick={() => startEdit(task)} className="btn btn-warning">Edit</button>
              )}
              <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))
      )}
    </div> 
  );
}

export default TasksPage;
