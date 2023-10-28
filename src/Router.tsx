import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import GroupMain from './pages/group/GroupMain';
import Signup from './pages/user/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        // 로그인 페이지
        path: '/login',
        element: <div>로그인 페이지</div>,
      },
      {
        // 회원가입 페이지
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/group',
        element: <GroupMain />,
      },
    ],
  },
]);

export default router;
