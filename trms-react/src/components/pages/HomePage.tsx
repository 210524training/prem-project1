import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectUser, UserState } from '../../slices/user.slice';

type Props = {}

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector<UserState>(selectUser);

	return (
		<>
			
		</>
	);
}

export default HomePage;