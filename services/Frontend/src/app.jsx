import React, { useState, useEffect } from 'react';
import TasksPage from './TasksPage';
import AboutPage from './AboutPage';

// URL ke hash se page badalta hai: About pehla (default) page hai, Tasks #/tasks par
const getPage = () => (window.location.hash === '#/tasks' ? 'tasks' : 'about');

function App() {
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    const onHashChange = () => setPage(getPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const linkStyle = (active) => ({
    marginRight: '10px',
    padding: '6px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: active ? '#fff' : '#333',
    backgroundColor: active ? '#007bff' : '#e9ecef',
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <nav style={{ marginBottom: '20px' }}>
        <a href="#/" style={linkStyle(page === 'about')}>ℹ️ About</a>
        <a href="#/tasks" style={linkStyle(page === 'tasks')}>📋 Tasks</a>
      </nav>

      {page === 'tasks' ? <TasksPage /> : <AboutPage />}
    </div>
  );
}

export default App;
