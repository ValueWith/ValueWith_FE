import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import GroupMain from './pages/group/GroupMain';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/group',
        element: <GroupMain />,
      },
    ],
  },
]);

export default router;
