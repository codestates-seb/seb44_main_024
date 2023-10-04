import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './pages/UI/Header';
import Footer from './pages/UI/Footer';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
