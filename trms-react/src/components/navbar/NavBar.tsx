import React, { Dispatch, SetStateAction } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import User from '../../models/user';
import './NavBar.css';

type Props = {
  currentUser: User | undefined,
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>,
}

const NavBar: React.FC<Props> = ({currentUser, setCurrentUser}) => {
  const history = useHistory();
  console.log(currentUser);

	const handleLogout = () => {
    setCurrentUser(undefined);
		history.push('/');
	}

	return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary m-2">
      <div id="nav" className="container-fluid">
        <NavLink className="navbar-brand" to="/">Tuition Reimbursement</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            { !currentUser ? (
              <li className="nav-item">
              <NavLink className="nav-link" to="/login">Create a New Form</NavLink>
            </li>
            ) : currentUser.role === 'Employee' ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/forms">My Forms</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/forms">Create a New Form</NavLink>
                  </li>
                </>
              ) : currentUser.role === 'Supervisor' || 'Head' || 'Co' ? (
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
            { !currentUser ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
              ) : (
               <> 
                <h5 className="text-white">{currentUser.username}</h5>
                <li className="nav-item">
                  <input type='submit' onClick={handleLogout} value='Logout' />
                </li>
              </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
	);
}

export default NavBar;