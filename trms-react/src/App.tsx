import React, { useState } from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import AppRoutes from './router/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer';
import User from './models/user';
import Form from './models/form';

const App: React.FC = (): JSX.Element => {

  let [currentUser, setCurrentUser] = useState<User | undefined>();
  let [currentForm, setCurrentForm] = useState<Form | undefined>();

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <AppRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} 
          currentForm={currentForm} setCurrentForm={setCurrentForm} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
