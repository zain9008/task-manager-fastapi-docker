 import React from 'react';
import './AboutPage.css'; // 🚀 CSS file ko yahan import kiya

function AboutPage() {
  return (
    <div className="about-container">
      <h2>ℹ️ About This Project</h2>
      <p>
        Yeh ek simple <strong>Task Manager</strong> hai jisme aap tasks bana sakte hain,
        edit kar sakte hain, complete mark kar sakte hain aur delete kar sakte hain.
      </p>

      <div className="about-card">
        <h3>🧰 Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React (Vite), port 8080</li>
          <li><strong>Backend:</strong> FastAPI (Python), port 8000</li>
          <li><strong>Database:</strong> PostgreSQL, SQLAlchemy ORM ke zariye</li>
          <li><strong>Deployment:</strong> Docker / Docker Compose</li>
        </ul>
      </div>

      <div className="about-card">
        <h3>✨ Features</h3>
        <ul>
          <li>Naya task banana (title aur description)</li>
          <li>Task edit karna</li>
          <li>Done / Undo se task complete ya incomplete karna</li>
          <li>Soft delete: task list se hat jata hai, lekin database mein rehta hai</li>
          <li>Har request par error ka message screen par dikhna</li>
        </ul>
      </div>

      <div className="about-card">
        <h3>🔌 API Endpoints</h3>
        <table className="api-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>URL</th>
              <th>Kaam</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>GET</td><td>/health</td><td>Server check</td></tr>
            <tr><td>GET</td><td>/tasks</td><td>Saare tasks</td></tr>
            <tr><td>POST</td><td>/tasks</td><td>Naya task</td></tr>
            <tr><td>GET</td><td>/tasks/{'{id}'}</td><td>Ek task</td></tr>
            <tr><td>PUT</td><td>/tasks/{'{id}'}</td><td>Task update</td></tr>
            <tr><td>DELETE</td><td>/tasks/{'{id}'}</td><td>Soft delete</td></tr>
          </tbody>
        </table>
        <p className="api-docs-text">
          API docs: <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">localhost:8000/docs</a>
        </p>
      </div>

      <div className="about-card">
        <h3>👤 Developer</h3>
        <p className="developer-text">Zain Yaseen</p>
      </div>
    </div>
  );
}

export default AboutPage;
