import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout, selectUser, UserState } from '../../slices/user.slice';
import './NavBar.css';

type Props = {}

const NavBar: React.FC<Props> = (props) => {
  const history = useHistory();
	const dispatch = useAppDispatch();
	const user = useAppSelector<UserState>(selectUser);

	const handleLogout = () => {
		dispatch(logout());
		history.push('/');
	}

	return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top m-2">
      <div id="nav" className="container-fluid">
        <NavLink className="navbar-brand" to="/">Tuition Reimbursement</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            { !user ? (
              <li className="nav-item">
              <NavLink className="nav-link" to="/forms">Create a New Form</NavLink>
            </li>
            ) : user?.role === 'Employee' ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/forms">My Forms</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/forms">Create a New Form</NavLink>
                  </li>
                </>
              ) : user?.role === 'Supervisor' || 'Head' || 'Co' ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/forms">My Forms</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/forms">Create a New Form</NavLink>
                  </li>
                </>
              ) : ('')
            }
          </ul>
          <ul className="navbar-nav ms-auto">
            { !user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
              ) : (
              <li className="nav-item">
                <input type='submit' onClick={handleLogout} value='Logout' />
              </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
	);
}

export default NavBar;