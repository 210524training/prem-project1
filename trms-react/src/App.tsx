import React from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import AppRoutes from './router/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
