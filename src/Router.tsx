import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/Home';
import GroupMain from './pages/group/GroupMain';
import GroupRecruit from './pages/group/GroupRecruit';
import GroupManagement from './pages/mylounge/GroupManagement';
import EditProfile from './pages/mylounge/EditProfile';
import GroupDetail from './pages/group/GroupDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, path: '/', element: <Home /> },
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
      {
        path: 'group',
        children: [
          { path: ':groupId', element: <GroupDetail /> },
          {
            path: 'recruit',
            element: <GroupRecruit />,
          },
          { index: true, element: <GroupMain /> },
        ],
      },
      {
        path: 'mylounge',
        children: [
          { index: true, element: <GroupManagement /> },
          {
            path: 'management',
            element: <GroupManagement />,
          },
          {
            path: 'profile',
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
