import './App.css';
import { Outlet } from 'react-router-dom';
import Main from './pages/MainPage/Main';
import MovieGallery from './pages/UI/MovieGallery';
import Header from './pages/UI/Header';

function App() {
  return (
    <>
      <Main />
    </>
  );
}

export default App;
