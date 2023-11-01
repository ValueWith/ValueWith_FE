import { createBrowserRouter } from 'react-router-dom';
import App from './App';
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
    ],
  },
]);

export default router;
