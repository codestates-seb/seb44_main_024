import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './pages/UI/Header';

function App() {
  return (
    <>
      <Outlet />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
