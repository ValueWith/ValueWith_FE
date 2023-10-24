import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import GroupMain from './pages/group/GroupMain';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/group',
        element: <GroupMain />,
      },
    ],
  },
]);

export default router;
