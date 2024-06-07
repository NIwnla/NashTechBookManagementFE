import React from 'react';
import { FaBook, FaClipboardList, FaHome, FaKey, FaThList, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';
import Roles from '../constraint/Roles';

const NavBar = () => {
    const { userId,userRole, username, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-icon">
                    <FaHome />
                </Link>
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/books" className="navbar-item"><FaBook />Books</Link>
                {userRole === Roles.ROLE_SUPERUSER &&
                    <div>
                        <Link to="/categories" className="navbar-item"><FaThList />Category</Link>
                        <Link to="/requests" className="navbar-item"><FaClipboardList />Request</Link>
                    </div>
                }
                {userRole === Roles.ROLE_USER &&
                   <Link to={`/requests/user/${userId}`} className="navbar-item"><FaClipboardList />My Request</Link>
                }

            </div>
            <div className="navbar-right">
                {isLoggedIn ? (
                    <>
                        <Link to="/profile" className="navbar-item"><FaUser />{username}</Link>
                        <button onClick={handleLogout} className="navbar-item">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-item"><FaKey />Login</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
