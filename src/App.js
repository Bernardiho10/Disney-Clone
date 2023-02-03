import './App.css';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Errorpage from './components/Errorpage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} errorElement={<Errorpage />} />
      </Routes>
    </div>
  );
}


export default App;
