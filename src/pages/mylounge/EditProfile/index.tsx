import { SubmitHandler, useForm } from 'react-hook-form';

import { SetStateAction, useEffect, useState } from 'react';
import ProfileUploader from '@/components/uploader/ProfileUploader';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';

import * as S from './EditProfile.styles';
import * as US from '@pages/user/User.styles';
import { useLounge, useProfile } from '@/hooks/useLounge';
import { extractNumber } from '@/utils/extractNumber';
import { useUser } from '@/hooks/useUser';

const GENDER_LISTDATA = ['여성', '남성'];
const AGEGROUP_LISTDATA = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const password = watch('password');
  const { data: userData, isLoading, isError } = useProfile();
  const { userInfo } = useUser();

  const [provider, setProvider] = useState<string>('');

  const [file, setFile] = useState<File | undefined>(undefined);
  const [isImgUploading, setImgUploading] = useState(false);
  const [storedImgUrl, setStoredImgUrl] = useState();

  const [gender, setGender] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');

  // gender, ageGreoup 빈 값 체크
  const [isGenderError, setIsGenderError] = useState<boolean>(false);
  const [isAgeGroupError, setIsAgeGroupError] = useState<boolean>(false);

  const { handleEditProfile } = useLounge();

  // 디버깅용 코드
  // useEffect(() => {
  //   console.log(file);
  // }, [file]);

  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.data.nickName);
      setValue('email', userData.data.email);
      setGender(userData.data.gender === 'female' ? '여성' : '남성');
      setStoredImgUrl(userData.data.profileUrl);
      setProvider(userData.data.provider); // 카카오 로그인인지 일반 로그인인지

      // 연령대 데이터 매칭
      AGEGROUP_LISTDATA.map((item, index) => {
        if (item.includes(userData.data.age)) {
          setAgeGroup(item);
        }
      });

      const userInfo = {
        memberId: userData.data.memberId,
        memberNickname: userData.data.nickName,
        memberEmail: userData.data.email,
        memberProfileUrl: userData.data.profileUrl,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userData]);

  const resetRegisteredData = () => {
    reset({
      groupThumbnail: null,
    });
    setStoredImgUrl(undefined);
    setFile(undefined);
  };

  // 드롭다운 폼 유효성 검사
  const handleFormKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      if (gender === '') setIsGenderError(true);
      if (ageGroup === '') return setIsAgeGroupError(true);
    }
  };

  //  폼 제출
  const onSubmit = async (data: any) => {
    gender === '' ? setIsGenderError(true) : setIsGenderError(false);

    // 비밀번호 처리
    const preProcessData = {
      nickName: data.nickname,
      age: extractNumber(ageGroup),
      profileUrl: '',
      firstPassword: '',
      secondPassword: '',
    };

    if (provider !== 'kakao' && password !== '') {
      preProcessData.firstPassword = data.password;
      preProcessData.secondPassword = data.passwordConfirm;
    }

    // 1. 이미지가 변경되지 않았을 때
    if (file === undefined && storedImgUrl !== undefined) {
      preProcessData.profileUrl = storedImgUrl;
    }

    // 2. 이미지가 변경되었을 때
    if (file !== undefined && storedImgUrl !== undefined) {
      preProcessData.profileUrl = storedImgUrl;
    }

    // 3. 이미지가 삭제되었을 때
    if (file === undefined && storedImgUrl === undefined) {
      preProcessData.profileUrl = '';
    }

    await handleEditProfile(
      preProcessData,
      userInfo.memberId,
      userInfo.memberEmail,
      file
    );
  };

  return (
    <S.EditProfileContainer>
      <form
        className="mt-[42px]"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleFormKeyPress}
      >
        {/* 프로필 이미지 */}
        <ProfileUploader
          storedImgUrl={storedImgUrl}
          onFileSelected={setFile}
          onFileDeleted={resetRegisteredData}
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
          <US.InputHeading htmlFor="email">이메일 *</US.InputHeading>
          <US.InputContainer>
            <Input
              type="text"
              inputType="input"
              className="disabled"
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
          </US.InputContainer>
        </div>

        {/* 카카오 로그인은 비밀번호 제외  */}
        {provider !== 'kakao' && (
          <>
            {/* 비밀번호 */}
            <Input
              type="password"
              inputType="input"
              label="비밀번호 *"
              placeholder="영문, 숫자 포함 6자 이상"
              {...register('password', {
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
              {...register('passwordConfirm')}
              errors={errors}
            />
          </>
        )}

        {/* 성별 */}
        <div className="mb-[24px]">
          <US.InputHeading>성별 *</US.InputHeading>
          <Dropdown
            height="42px"
            className="disabled"
            listData={GENDER_LISTDATA}
            selectedItem={gender}
            onSelectItem={(item) => setGender(item)}
            error={isGenderError}
          />
        </div>

        {/* 연령대 */}
        <div className="mb-[24px]">
          <US.InputHeading>연령대 *</US.InputHeading>
          <Dropdown
            height="42px"
            listData={AGEGROUP_LISTDATA}
            selectedItem={ageGroup}
            onSelectItem={(item) => setAgeGroup(item)}
            placeholder="연령대를 선택해주세요"
            error={isAgeGroupError}
          />
        </div>

        {/* 회원가입 버튼  */}
        <Button
          type="submit"
          styleType={
            watch('nickname') !== '' && watch('email') != '' && ageGroup !== ''
              ? 'solid'
              : 'disabled'
          }
          size="md"
          fullWidth
        >
          정보 수정
        </Button>
      </form>
    </S.EditProfileContainer>
  );
}

export default EditProfile;
