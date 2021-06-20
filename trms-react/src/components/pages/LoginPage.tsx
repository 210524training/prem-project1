import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { loginAsync } from "../../slices/user.slice";

const LoginPage: React.FC<unknown> = (props) => {

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(loginAsync({username, password}));
		history.push('/');
	}
	return (
		<>
		
		</>
	);
};

export default LoginPage;
