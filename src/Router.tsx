import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/Home';
import GroupMain from './pages/group/GroupMain';
import GroupRecruit from './pages/group/GroupRecruit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: 'group',
        children: [
          { index: true, element: <GroupMain /> },
          {
            path: 'recruit',
            element: <GroupRecruit />,
          },
        ],
      },
      {
        // 로그인 페이지
        path: '/login',
        element: <Login />,
      },
      {
        // 회원가입 페이지
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
