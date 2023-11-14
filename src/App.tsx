import { Outlet, useLocation } from 'react-router-dom';
import MainTemplate from '@components/template/MainTemplate.tsx';
import Header from '@components/Header/index.tsx';
import Footer from '@components/Footer/index.tsx';
import { Suspense } from 'react';
import Loader from './components/Loader';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/group/recruit' ? (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      ) : (
        <>
          <Header />
          <MainTemplate>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </MainTemplate>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
