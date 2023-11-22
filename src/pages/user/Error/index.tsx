import ErrorImage from '@/assets/Error.svg?react';
import theme from '@/assets/styles/theme';
import Button from '@/components/Button';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MainTemplate from '@/components/template/MainTemplate.tsx';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <MainTemplate>
        <div className="flex flex-col items-center mt-[160px]">
          <ErrorImage />
          <div
            className="mt-[36px] text-center leading-loose"
            style={{
              color: `${theme.color.fontGray}`,
            }}
          >
            <strong
              className="text-[30px]"
              style={{
                color: `${theme.color.primary}`,
              }}
            >
              페이지를 찾을 수 없습니다.{' '}
            </strong>
            <br />
            존재하지 않은 주소를 입력하셨거나, <br />
            요청하신 페이지의 주소가 변경, 혹은 삭제되어 찾을 수 없습니다.
          </div>

          <Button
            style={{ marginTop: '50px' }}
            onClickHandler={() => navigate('/')}
          >
            메인으로
          </Button>
        </div>
      </MainTemplate>
      <Footer />
    </>
  );
}

export default Error;
