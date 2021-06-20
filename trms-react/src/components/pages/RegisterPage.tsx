import React, { ChangeEvent, FormEvent, useState } from "react";
import tuitionClient from "../../remote/trms.client";

const RegisterPage: React.FC<unknown> = (props) => {

	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [email, setEmail] = useState<string>();
	
	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await tuitionClient.post<boolean>('/api/v1/users', {
			username,
			password,
			role: 'Employee',
			email,
		});
		console.log(response.data);
	}
	console.log('username; ', username);
	console.log('password; ', password);

	return (
		<>

		</>
	);
};

export default RegisterPage;
