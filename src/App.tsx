import { Outlet } from 'react-router-dom';
import MainTemplate from './components/template/MainTemplate.tsx';
import Header from './components/Header/index.tsx';
import Footer from './components/Footer/index.tsx';

function App() {
  return (
    <>
      <Header />
      <MainTemplate>
        <Outlet />
      </MainTemplate>
      <Footer />
    </>
  );
}

export default App;
