import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAuth from '@/hooks/useAuth';

import * as S from '../User.styles';
import Button from '@/components/Button';
import theme from '@/assets/styles/theme';
import Input from '@/components/Input';
import Logo from '@assets/TweaverLogo.svg?react';
import ErrorMessage from '@/components/Message/ErrorMessage';
import Loader from '@/components/Loader';

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

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&redirect_uri=${
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    }&response_type=code`;
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

      <div className="flex mt-3">
        <Button
          type="button"
          size="sm"
          styleType="text"
          className="ml-auto"
          style={{
            padding: '0',
            color: `${theme.color.fontgray}`,
          }}
          onClickHandler={() => navigate('/signup')}
        >
          Tweaver 회원가입
        </Button>
      </div>

      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </S.UserWrapper>
  );
}

export default Login;
