import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';
import './HomePage.css';

type Props = {}

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector<UserState>(selectUser);

	return (
		<>
			<div id="banner" className="banner" />
			
		</>
	);
}

export default HomePage;