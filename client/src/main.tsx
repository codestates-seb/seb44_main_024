import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux-toolkit/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import RedirectPage from './pages/RedirectPage/RedirectPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SearchPage from './pages/SearchPage/SearchPage';
import MyPage from './pages/MyPage/MyPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';

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
      { path: '/category/:genre', element: <CategoryPage /> },
      { path: '/category/:tag', element: <CategoryPage /> },
      { path: '*', element: <ErrorPage /> },
      { path: '/mypage', element: <MyPage /> },
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
