import { SubmitHandler, set, useForm } from 'react-hook-form';
import { useState } from 'react';

import { sendEmailCode, checkEmailCode } from '@/helpers/emailValidation';

import Button from '@/components/Button';

import * as S from '../User.styles';
import theme from '@/assets/styles/theme';
import Input from '@/components/Input';
import Logo from '@assets/TweaverLogo.svg?react';
import Dropdown from '@/components/Dropdown';

interface SignupFormProps {
  nickname: string;
  email: string;
  emailCode: string;
  password: string;
  passwordConfirm: string;
}

const GENDER_LISTDATA = ['여성', '남성'];
const AGEGROUP_LISTDATA = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormProps>({
    mode: 'onBlur',
  });

  const password = watch('password');
  const [gender, setGender] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState<boolean>(false);

  // 이메일 인증번호 전송
  const handleSendEmailCode = () => {
    if (!watch('email') || errors.email) return;

    // 인증번호 전송 성공 시, 인증번호 입력 창 노출
    const isCodeSent = sendEmailCode(watch('email'));
    if (isCodeSent) setIsEmailChecked(true);
  };

  // 이메일 인증번호 유효성 검사
  const handleCheckEmailValidate = () => {
    const code = watch('emailCode');
    const isCodeValid = checkEmailCode(code);

    // 코드가 유효한 경우, 인증번호 입력 창 숨기고 인증 완료 메시지 노출
    if (isCodeValid) {
      setIsEmailChecked(false);
      setIsEmailCodeValid(true);
    }
  };

  //  폼 제출
  const onSubmit: SubmitHandler<SignupFormProps> = async (data) => {
    console.log(data);
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

      <form className="mt-[42px]" onSubmit={handleSubmit(onSubmit)}>
        {/* 프로필 이미지 */}
        {/* 닉네임 */}
        <Input
          label="닉네임 *"
          inputType="input"
          placeholder="닉네임 입력"
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
            minLength: {
              value: 2,
              message: '닉네임은 2글자 이상 입력해주세요.',
            },
            maxLength: {
              value: 12,
              message: '닉네임은 12글자 이하로 입력해주세요.',
            },
          })}
          errors={errors}
        />

        {/* 이메일 */}
        <div>
          <S.InputHeading htmlFor="email">이메일 *</S.InputHeading>
          <S.InputContainer>
            <Input
              type="text"
              inputType="input"
              placeholder="이메일 주소를 입력해주세요"
              readOnly={!!isEmailCodeValid}
              {...register('email', {
                required: '이메일 주소를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message:
                    '올바른 이메일 형식이 아닙니다. 이메일을 확인해주세요.',
                },
              })}
              errors={errors}
            />

            <Button
              type="button"
              size="md"
              styleType={
                isEmailChecked
                  ? 'outline'
                  : isEmailCodeValid
                  ? 'disabled'
                  : 'solid'
              }
              className="ml-2.5"
              style={{ minWidth: '110px' }}
              onClickHandler={handleSendEmailCode}
            >
              {isEmailChecked ? '재전송' : '인증번호 전송'}
            </Button>
          </S.InputContainer>

          {isEmailChecked && (
            <S.InputContainer className="mt-[-14px]">
              <Input
                type="text"
                inputType="input"
                placeholder="인증번호 입력"
                {...register('emailCode', {
                  required: '인증번호를 입력해주세요.',
                })}
                errors={errors}
              />
              <Button
                type="button"
                size="md"
                className="ml-2.5"
                style={{ minWidth: '110px' }}
                onClickHandler={handleCheckEmailValidate}
              >
                이메일 인증
              </Button>{' '}
            </S.InputContainer>
          )}
        </div>

        {/* 비밀번호 */}
        <Input
          type="password"
          inputType="input"
          label="비밀번호 *"
          placeholder="영문, 숫자 포함 6자 이상"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
              message:
                '영문, 숫자를 포함한 6자 이상의 비밀번호를 입력해주세요.',
            },
          })}
          errors={errors}
        />

        {/* 비밀번호 확인 */}
        <Input
          type="password"
          inputType="input"
          label="비밀번호 확인 *"
          placeholder="비밀번호 확인"
          {...register('passwordConfirm', {
            required: '비밀번호를 다시 입력해주세요.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          errors={errors}
        />

        {/* 성별 */}
        <div className="mb-[24px]">
          <S.InputHeading>성별 *</S.InputHeading>
          <Dropdown
            height="42px"
            listData={GENDER_LISTDATA}
            placeholder={'성별을 선택해주세요'}
            selectedItem={gender}
            onSelectItem={(item) => setGender(item)}
          />
        </div>

        {/* 연령대 */}
        <div className="mb-[24px]">
          <S.InputHeading>연령대 *</S.InputHeading>
          <Dropdown
            height="42px"
            listData={AGEGROUP_LISTDATA}
            placeholder={'연령대를 선택해주세요'}
            selectedItem={ageGroup}
            onSelectItem={(item) => setAgeGroup(item)}
          />
        </div>

        {/* 회원가입 버튼  */}
        <Button
          type="submit"
          styleType={isValid ? 'solid' : 'disabled'}
          size="lg"
          fullWidth
        >
          회원가입
        </Button>
      </form>
    </S.UserWrapper>
  );
}

export default Signup;
