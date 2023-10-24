import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import GroupMain from './pages/group/GroupMain';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/group',
        element: <GroupMain />,
      },
    ],
  },
]);

export default router;
