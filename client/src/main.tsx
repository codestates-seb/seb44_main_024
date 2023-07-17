import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux-toolkit/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import RedirectPage from './pages/RedirectPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import SearchPage from './pages/SearchPage/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      { index: true, element: <MainPage /> },
      { path: '/redirect', element: <RedirectPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/movies/:movieId', element: <DetailsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
