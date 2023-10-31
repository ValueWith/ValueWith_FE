import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as S from '../User.styles';
import Button from '@/components/Button';
import theme from '@/assets/styles/theme';
import Input from '@/components/Input';
import Logo from '@assets/TweaverLogo.svg?react';
import ErrorMessage from '@/components/Message/ErrorMessage';
import { IoIosArrowForward } from 'react-icons/io';

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
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormProps>({
    mode: 'onBlur',
  });

  //  폼 제출
  const onSubmit: SubmitHandler<SignupFormProps> = async (data) => {
    console.log(data);

    // 데이터 통신 로직

    // 커스텀 에러 처리
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
        회원가입
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

        {/* 회원가입 버튼  */}
        <Button type="submit" size="lg" fullWidth>
          로그인
        </Button>
      </form>

      {/* <ErrorMessage className="mt-1">
        없는 이메일이거나, 비밀번호가 일치하지 않습니다.
      </ErrorMessage> */}

      <div className="flex">
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
    </S.UserWrapper>
  );
}

export default Login;
