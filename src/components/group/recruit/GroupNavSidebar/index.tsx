import { useNavigate } from 'react-router-dom';
import Logo from '@assets/TweaverLogo.svg?react';
import * as S from './GroupNavSidebar.styles';
import theme from '@/assets/styles/theme';

const RECRUIT_STEP = [
  {
    id: 1,
    title: '여행일정 등록',
  },
  {
    id: 2,
    title: '기본정보 입력',
  },
];

interface GroupNavSidebarProps {
  selectedStep: number;
  onSelectedStep: (step: number) => void;
}

function GroupNavSidebar({
  selectedStep,
  onSelectedStep,
}: GroupNavSidebarProps) {
  const navigate = useNavigate();

  return (
    <S.RecruitSidebarContainer>
      <Logo
        color={theme.color.primary}
        className="px-4 mb-[45px] cursor-pointer"
        onClick={() => navigate('/')}
      ></Logo>

      {RECRUIT_STEP.map((step) => (
        <S.RecruitSidebarNavWrapper
          key={step.id}
          className={selectedStep === step.id ? 'active' : ''}
          onClick={() => onSelectedStep(step.id)}
        >
          <S.RecruitNav>
            <S.RecruitNavHeading>{`STEP ${step.id}`}</S.RecruitNavHeading>
            {step.title}
          </S.RecruitNav>
        </S.RecruitSidebarNavWrapper>
      ))}
    </S.RecruitSidebarContainer>
  );
}

export default GroupNavSidebar;
