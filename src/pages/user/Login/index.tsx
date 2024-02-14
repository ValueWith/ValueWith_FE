import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAuth from '@/hooks/useAuth';

import * as S from '../User.styles';
import KakaoLogo from '@assets/kakaoLogo.svg?react';

import { IoMailSharp } from 'react-icons/io5';

import Button from '@/components/common/Button';
import theme from '@/assets/styles/theme';
import Input from '@/components/common/Input';
import Logo from '@assets/TweaverLogo.svg?react';

import instance from '@/apis';
import ErrorMessage from '@/components/common/Message/ErrorMessage';
import Loader from '@/components/common/Loader';

interface SignupFormProps {
  nickname: string;
  email: string;
  emailCode: string;
  password: string;
  passwordConfirm: string;
}

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormProps>({
    mode: 'onBlur',
  });

  const { handleLogin, isLoading, isError } = useAuth();

  //  폼 제출
  const onSubmit: SubmitHandler<SignupFormProps> = async (data) => {
    await handleLogin(data);
  };

  const handleKakao = async () => {
    window.location.href =
      import.meta.env.VITE_SERVER_URL + '/oauth2/authorization/kakao';
  };

  return (
    <S.UserWrapper>
      <S.UserHeader>
        <Logo
          color={`${theme.color.primary}`}
          width={165}
          height={36}
          className="mr-4 mb-2"
        />
        로그인
      </S.UserHeader>

      <form className="login mt-[76px]" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <Input
          type="text"
          inputType="input"
          placeholder="이메일"
          style={{ height: '56px' }}
          {...register('email')}
          errors={errors}
        />

        {/* 비밀번호 */}
        <Input
          type="password"
          inputType="input"
          placeholder="비밀번호"
          style={{ height: '56px' }}
          {...register('password')}
          errors={errors}
        />

        {/* 로그인 버튼  */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          styleType={isLoading ? 'disabled' : 'solid'}
        >
          {isLoading ? <Loader width={30} height={30} /> : '로그인'}
        </Button>
      </form>

      {isError && (
        <ErrorMessage className="mt-1">
          없는 이메일이거나, 비밀번호가 일치하지 않습니다.
        </ErrorMessage>
      )}

      <S.Divider></S.Divider>

      {/* 소셜 로그인  */}
      <S.SocialLoginContainer>
        {/* 이메일 로그인 */}
        <S.EmailButton onClick={() => navigate('/signup')}>
          <IoMailSharp
            className="w-[24px] h-[24px]"
            style={{ marginRight: '9px' }}
          />
          이메일로 시작하기
        </S.EmailButton>

        {/* 카카오 로그인 */}
        <S.KakaoButton onClick={handleKakao}>
          <KakaoLogo style={{ marginRight: '10px' }} />
          카카오로 시작하기
        </S.KakaoButton>
      </S.SocialLoginContainer>
    </S.UserWrapper>
  );
}

export default Login;
