import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import { extractNumber } from '@/utils/extractNumber';

import useAuth from '@/hooks/useAuth';
import { useEmailVerification } from '@/hooks/useEmailValidation';

import * as S from '../User.styles';
import Button from '@/components/Button';
import theme from '@/assets/styles/theme';
import Input from '@/components/Input';
import Logo from '@assets/TweaverLogo.svg?react';
import Dropdown from '@/components/Dropdown';
import ProfileUploader from '@/components/uploader/ProfileUploader';
import Loader from '@/components/Loader';
import { SignUpProps } from '@/apis/user.model';

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
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormProps>({
    mode: 'onBlur',
  });

  const [file, setFile] = useState<File | undefined>(undefined);
  const [isImgUploading, setImgUploading] = useState(false);

  const password = watch('password');
  const [gender, setGender] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');

  // gender, ageGreoup 빈 값 체크
  const [isGenderError, setIsGenderError] = useState<boolean>(false);
  const [isAgeGroupError, setIsAgeGroupError] = useState<boolean>(false);

  const {
    handleSendEmailCode,
    handleCheckEmailValidate,
    isEmailChecked,
    isEmailCodeValid,
  } = useEmailVerification(watch('email'), watch('emailCode'), errors, trigger);

  const { handleSignup, isLoading } = useAuth();

  // 디버깅용 코드
  // useEffect(() => {
  //   console.log(file);
  // }, [file]);

  // 드롭다운 폼 유효성 검사
  const handleFormKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      if (gender === '') setIsGenderError(true);
      if (ageGroup === '') return setIsAgeGroupError(true);
    }
  };

  //  폼 제출
  const onSubmit: SubmitHandler<SignupFormProps> = async (data) => {
    if (gender === '') return setIsGenderError(true);
    if (ageGroup === '') return setIsAgeGroupError(true);

    const age = extractNumber(ageGroup);
    if (age === null) return;

    const userData: SignUpProps = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
      gender: gender === '여성' ? 'female' : 'male',
      age: String(age),
    };

    await handleSignup(userData, file);
  };

  const resetRegisteredData = () => {
    setFile(undefined);
  };

  return (
    <S.UserWrapper>
      {isLoading && <Loader className="z-[1]" />}

      <S.UserHeader>
        <Logo
          color={`${theme.color.primary}`}
          width={165}
          height={36}
          className="mr-4 mb-2"
        />
        회원가입
      </S.UserHeader>

      <form
        className="mt-[42px]"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleFormKeyPress}
      >
        {/* 프로필 이미지 */}
        <ProfileUploader
          onFileDeleted={resetRegisteredData}
          onFileSelected={setFile}
          className={isImgUploading ? 'loading' : ''}
        />

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
            error={isGenderError}
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
            error={isAgeGroupError}
          />
        </div>

        {/* 회원가입 버튼  */}
        <Button
          type="submit"
          styleType={
            isValid && isEmailCodeValid && ageGroup !== '' && gender != ''
              ? 'solid'
              : 'disabled'
          }
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
