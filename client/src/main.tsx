import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Test from './components/Test.tsx';
import SignupPage from './components/SignupPage/SignupPage.tsx';
import './index.css';
import { store } from './redux-toolkit/store.ts';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    // 에러페이지 라우터 적용 예시
    // errorElement: <ErrorPage />,

    // 기본 '/' 루트 렌더링 화면 (메인페이지)
    children: [
      { index: true, element: <Test /> },

      // 기타 라우터 적용 예시
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
      { path: '/signup', element: <SignupPage /> },
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
