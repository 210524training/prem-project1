import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import User from "../../../models/user";
import { sendLogin } from "../../../remote/trms.api";

type Props = {
	currentUser: User | undefined,
	setCurrentUser: Dispatch<SetStateAction<User | undefined>>
}

const LoginPage: React.FC<Props> = ({currentUser, setCurrentUser}) => {

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const history = useHistory();

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await sendLogin(username, password);
		history.push('/');
	}
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
								<legend className="">Login</legend>
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
							<br></br>
							<div className="control-group">
								<div className="controls">
									<button className="btn btn-success">Login</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
