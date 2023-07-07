import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Test from './components/Test';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import './index.css';
import { store } from './redux-toolkit/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    // 에러페이지 라우터 적용 예시
    // errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Test /> },
      {
        path: '/details',
        element: <DetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
