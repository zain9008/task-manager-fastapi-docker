import React from 'react';

const card = {
  background: '#f4f4f4',
  padding: '15px',
  margin: '15px 0',
  borderRadius: '4px',
};

const th = { textAlign: 'left', padding: '6px 10px', borderBottom: '1px solid #ccc' };
const td = { padding: '6px 10px', borderBottom: '1px solid #e0e0e0' };

function AboutPage() {
  return (
    <div>
      <h2>ℹ️ About This Project</h2>
      <p>
        Yeh ek simple <strong>Task Manager</strong> hai jisme aap tasks bana sakte hain,
        edit kar sakte hain, complete mark kar sakte hain aur delete kar sakte hain.
      </p>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>🧰 Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React (Vite), port 8080</li>
          <li><strong>Backend:</strong> FastAPI (Python), port 8000</li>
          <li><strong>Database:</strong> PostgreSQL, SQLAlchemy ORM ke zariye</li>
          <li><strong>Deployment:</strong> Docker / Docker Compose</li>
        </ul>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>✨ Features</h3>
        <ul>
          <li>Naya task banana (title aur description)</li>
          <li>Task edit karna</li>
          <li>Done / Undo se task complete ya incomplete karna</li>
          <li>Soft delete: task list se hat jata hai, lekin database mein rehta hai</li>
          <li>Har request par error ka message screen par dikhna</li>
        </ul>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>🔌 API Endpoints</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={th}>Method</th>
              <th style={th}>URL</th>
              <th style={th}>Kaam</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={td}>GET</td><td style={td}>/health</td><td style={td}>Server check</td></tr>
            <tr><td style={td}>GET</td><td style={td}>/tasks</td><td style={td}>Saare tasks</td></tr>
            <tr><td style={td}>POST</td><td style={td}>/tasks</td><td style={td}>Naya task</td></tr>
            <tr><td style={td}>GET</td><td style={td}>/tasks/{'{id}'}</td><td style={td}>Ek task</td></tr>
            <tr><td style={td}>PUT</td><td style={td}>/tasks/{'{id}'}</td><td style={td}>Task update</td></tr>
            <tr><td style={td}>DELETE</td><td style={td}>/tasks/{'{id}'}</td><td style={td}>Soft delete</td></tr>
          </tbody>
        </table>
        <p style={{ marginBottom: 0 }}>
          API docs: <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer">localhost:8000/docs</a>
        </p>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>👤 Developer</h3>
        <p style={{ margin: 0 }}>Zain Yaseen</p>
      </div>
    </div>
  );
}

export default AboutPage;
