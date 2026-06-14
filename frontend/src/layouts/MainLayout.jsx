import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, User, Home } from 'lucide-react';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="layout-root">
      <header className="navbar">
        <div className="container nav-container">
          <Link to="/" className="brand">
            <Activity className="brand-icon" />
            <span>FitCloud Tracker</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <Home size={18} />
              <span>Inicio</span>
            </Link>
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
              <User size={18} />
              <span>Mi Perfil</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
