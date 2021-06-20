import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout, selectUser, UserState } from '../../slices/user.slice';

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
		<nav>
			
		</nav>
	);
}

export default NavBar;