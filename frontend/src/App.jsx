import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

const App = () => {

  return (
    <div>
      <Header />
      <ToastContainer />
      <div  className="bbp-content">
        <Outlet />
      </div>
      <Footer />

    </div>
  );
};

export default App;
