import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { modalState } from './recoil/modalState';

import MainTemplate from '@components/template/MainTemplate.tsx';
import Header from '@components/Header/index.tsx';
import Footer from '@components/Footer/index.tsx';
import Loader from '@components/Loader';
import ConfirmModal from './components/modal/Confirm';
import AlertModal from './components/modal/Alert';

function App() {
  const { pathname } = useLocation();
  const modalDataState = useRecoilValue(modalState);

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

      {modalDataState.isModalOpen && (
        <>
          {modalDataState.type === 'confirm' ? (
            <ConfirmModal {...modalDataState} />
          ) : (
            <AlertModal {...modalDataState} />
          )}
        </>
      )}
    </>
  );
}

export default App;
