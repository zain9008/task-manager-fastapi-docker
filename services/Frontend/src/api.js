const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/tasks';

// Common request helper
const request = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
};

// Saare API Functions jo hum TasksPage mein use karenge
export const fetchTasks = () => request(API_URL);

export const addTask = (title, description) => 
  request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, completed: false }),
  });

export const updateTaskStatus = (task) => 
  request(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: !task.completed,
    }),
  });

export const updateTaskContent = (task, editTitle, editDescription) => 
  request(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: editTitle,
      description: editDescription,
      completed: task.completed,
    }),
  });

export const removeTask = (id) => request(`${API_URL}/${id}`, { method: 'DELETE' });
