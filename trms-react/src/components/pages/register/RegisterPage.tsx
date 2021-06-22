import React, { ChangeEvent, FormEvent, useState } from "react";
import tuitionClient from "../../../remote/trms.client";

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
		<div className="container">
			<div className="row">
				<div className="span12">
					<form className="form-horizontal" action='' method="POST" onSubmit={handleFormSubmit}>
						<fieldset>
							<div id="legend">
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<legend className="">Register</legend>
							</div>
							<div className="control-group">
								<label htmlFor="usernameInput" className="form-label">Username</label>
								<div className="controls">
									<input type="text" id="usernameInput" placeholder="Username" className="form-control" onChange={handleUsernameChange} />
								</div>
							</div>
							<div className="control-group">
								<label htmlFor="usernameInput" className="form-label">Password</label>
								<div className="controls">
									<input type="password" id="passwordInput" placeholder="Password" className="form-control" onChange={handlePasswordChange} />
								</div>
							</div>
							<div className="control-group">
								<label htmlFor="emailInput" className="form-label">Email</label>
								<div className="controls">
									<input type="email" id="emailInput" placeholder="Email" className="form-control" onChange={handleEmailChange} />
								</div>
							</div>
							<br></br>
							<div className="control-group">
								<div className="controls">
									<button className="btn btn-success">Register</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
