 import React, { useState, useEffect } from 'react';
import TasksPage from './TasksPage';
import AboutPage from './AboutPage';
import './App.css'; // 👈 CSS file ko yahan import kiya

// URL ke hash se page badalta hai
const getPage = () => (window.location.hash === '#/tasks' ? 'tasks' : 'about');

function App() {
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="app-container">
      <nav className="nav-bar">
        {/* Agar page 'about' hai to active class lagegi, nahi to inactive */}
        <a 
          href="#/" 
          className={`nav-link ${page === 'about' ? 'active' : 'inactive'}`}
        >
          ℹ️ About
        </a>
        
        {/* Agar page 'tasks' hai to active class lagegi, nahi to inactive */}
        <a 
          href="#/tasks" 
          className={`nav-link ${page === 'tasks' ? 'active' : 'inactive'}`}
        >
          📋 Tasks
        </a>
      </nav>

      {/* Conditional Rendering */}
      {page === 'tasks' ? <TasksPage /> : <AboutPage />}
    </div>
  );
}

export default App;
