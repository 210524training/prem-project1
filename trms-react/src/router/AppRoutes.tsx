import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from '../components/pages/HomePage';
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import TuitionFormPage from "../components/pages/TuitionFormPage";

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
