import React, { Dispatch, SetStateAction } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from '../components/pages/home/HomePage';
import LoginPage from "../components/pages/login/LoginPage";
import RegisterPage from "../components/pages/register/RegisterPage";
import TuitionFormPage from "../components/pages/form/create-form/TuitionFormPage";
import User from "../models/user";
import Form from "../models/form";
import FormDisplay from "../components/pages/form/form-edits/FormDisplay";
import FormEdits from "../components/pages/form/form-edits/FormEdits";

type Props = {
	currentUser: User | undefined,
	setCurrentUser: Dispatch<SetStateAction<User | undefined>>,
	currentForm: Form | undefined,
	setCurrentForm: Dispatch<SetStateAction<Form | undefined>>,
}

const AppRoutes: React.FC<Props> = ({currentUser, setCurrentUser, currentForm, setCurrentForm}) => {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route exact path='/forms'>
				<TuitionFormPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
			</Route>
			<Route exact path='/login'>
				<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
			</Route>
			<Route exact path='/register'>
				<RegisterPage />
			</Route>
			<Route exact path='/user/my-forms'>
				<FormDisplay currentUser={currentUser} setCurrentForm={setCurrentForm} />
			</Route>
			<Route exact path={'/user/forms/:formId'}>
				<FormEdits currentForm={currentForm} setCurrentForm={setCurrentForm} />
			</Route>
		</Switch>
	);
}

export default AppRoutes;
