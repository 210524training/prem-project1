import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from '../components/pages/home/HomePage';
import LoginPage from "../components/pages/login/LoginPage";
import RegisterPage from "../components/pages/register/RegisterPage";
import TuitionFormPage from "../components/pages/form/TuitionFormPage";

const AppRoutes: React.FC<unknown> = (props) => {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route exact path='/forms'>
				<TuitionFormPage />
			</Route>
			<Route exact path='/login'>
				<LoginPage />
			</Route>
			<Route exact path='/register'>
				<RegisterPage />
			</Route>
		</Switch>
	);
}

export default AppRoutes;
