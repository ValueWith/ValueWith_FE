import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Error from './pages/user/Error';
import loadable from '@loadable/component';

const Signup = loadable(() => import('./pages/user/Signup/index.tsx'));
const Login = loadable(() => import('./pages/user/Login/index.tsx'));
const Home = loadable(() => import('./pages/Home/index.tsx'));
const GroupMain = loadable(() => import('./pages/group/GroupMain/index.tsx'));
const GroupRecruit = loadable(
  () => import('./pages/group/GroupRecruit/index.tsx')
);
const GroupEdit = loadable(() => import('./pages/group/GroupEdit'));
const GroupManagement = loadable(
  () => import('./pages/mylounge/GroupManagement/index.tsx')
);

const EditProfile = loadable(
  () => import('./pages/mylounge/EditProfile/index.tsx')
);
const GroupDetail = loadable(
  () => import('./pages/group/GroupDetail/index.tsx')
);
const Chat = loadable(() => import('./pages/chat/index.tsx'));

export {
  Signup,
  Login,
  Home,
  GroupMain,
  GroupRecruit,
  GroupManagement,
  EditProfile,
  GroupDetail,
  Chat,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
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
            path: 'edit/:groupId',
            element: <GroupEdit />,
          },
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
      {
        path: 'chat',
        element: <Chat />,
      },
    ],
  },
]);

export default router;
