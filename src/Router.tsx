import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Error from './pages/user/Error';
import KakaoCallback from './pages/user/KakaoCallback';

const Signup = lazy(() => import('./pages/user/Signup'));
const Login = lazy(() => import('./pages/user/Login'));
const Home = lazy(() => import('./pages/Home'));
const GroupMain = lazy(() => import('./pages/group/GroupMain'));
const GroupRecruit = lazy(() => import('./pages/group/GroupRecruit'));
const GroupManagement = lazy(() => import('./pages/mylounge/GroupManagement'));
const EditProfile = lazy(() => import('./pages/mylounge/EditProfile'));
const GroupDetail = lazy(() => import('./pages/group/GroupDetail'));
const GroupEdit = lazy(() => import('./pages/group/GroupEdit'));
const Chat = lazy(() => import('./pages/chat'));

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
        path: 'login',
        children: [{ index: true, element: <Login /> }],
      },
      {
        // 회원가입 페이지
        path: '/signup',
        element: <Signup />,
      },
      {
        path: 'oauth2/callback/kakao',
        element: <KakaoCallback />,
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
