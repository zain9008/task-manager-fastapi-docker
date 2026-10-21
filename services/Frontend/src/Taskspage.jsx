import React, { useState, useEffect } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/tasks';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // har request ka common helper: res.ok check karta hai
  const request = async (url, options) => {
    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status}: ${text}`);
    }
    return res.status === 204 ? null : res.json();
  };

  const loadTasks = async () => {
    try {
      const data = await request(API_URL);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Tasks load nahi huay: ' + err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // POST
  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    try {
      await request(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false }),
      });
      setTitle('');
      setDescription('');
      loadTasks();
    } catch (err) {
      setError('Task save nahi hua: ' + err.message);
    }
  };

  // PUT: complete toggle (sirf wahi task badlega jis par click hua)
  const toggleComplete = async (task) => {
    try {
      const updated = await request(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }),
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError('Update nahi hua: ' + err.message);
    }
  };

  // PUT: edit save
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const saveEdit = async (task) => {
    if (!editTitle.trim()) return alert('Title is required');
    try {
      const updated = await request(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          completed: task.completed,
        }),
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError('Edit save nahi hua: ' + err.message);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      await request(`${API_URL}/${id}`, { method: 'DELETE' });
      loadTasks();
    } catch (err) {
      setError('Delete nahi hua: ' + err.message);
    }
  };

  const btn = (bg) => ({
    backgroundColor: bg, color: '#fff', border: 'none',
    padding: '5px 10px', marginLeft: '5px', cursor: 'pointer',
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🚀 React + FastAPI Task Manager</h2>

      <form onSubmit={createTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit" style={btn('#28a745')}>Add Task</button>
      </form>

      <h2>📋 Your Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tasks.length === 0 ? (
        <p>No tasks found. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: '#f4f4f4', padding: '10px', margin: '10px 0',
              borderRadius: '4px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            {editingId === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginRight: '10px', padding: '5px' }}
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
              <button onClick={() => toggleComplete(task)} style={btn('#17a2b8')}>
                {task.completed ? 'Undo' : 'Done'}
              </button>
              {editingId === task.id ? (
                <>
                  <button onClick={() => saveEdit(task)} style={btn('#28a745')}>Save</button>
                  <button onClick={() => setEditingId(null)} style={btn('#6c757d')}>Cancel</button>
                </>
              ) : (
                <button onClick={() => startEdit(task)} style={btn('#ffc107')}>Edit</button>
              )}
              <button onClick={() => deleteTask(task.id)} style={btn('#dc3545')}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TasksPage;
