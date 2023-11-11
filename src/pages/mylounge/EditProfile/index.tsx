import { SubmitHandler, useForm } from 'react-hook-form';

import { useState } from 'react';
import ProfileUploader from '@/components/uploader/ProfileUploader';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';

import * as S from './EditProfile.styles';
import * as US from '@pages/user/User.styles';

const GENDER_LISTDATA = ['여성', '남성'];
const AGEGROUP_LISTDATA = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const [file, setFile] = useState<File | null>(null);

  const [isImgUploading, setImgUploading] = useState(false);

  const password = watch('password');

  // TODO: API 요청 후 setGender에 값 할당
  const [gender, setGender] = useState<string>('남성');
  const [ageGroup, setAgeGroup] = useState<string>('');

  // gender, ageGreoup 빈 값 체크
  const [isGenderError, setIsGenderError] = useState<boolean>(false);
  const [isAgeGroupError, setIsAgeGroupError] = useState<boolean>(false);

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
  const onSubmit = async (data: any) => {
    console.log(data);

    gender === '' ? setIsGenderError(true) : setIsGenderError(false);
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
          <US.InputHeading htmlFor="email">이메일 *</US.InputHeading>
          <US.InputContainer>
            <Input
              type="text"
              inputType="input"
              value={'db_emailaddress'}
              className="disabled"
              {...register('email')}
              errors={errors}
            />
          </US.InputContainer>
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
          styleType={isValid && ageGroup !== '' ? 'solid' : 'disabled'}
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
