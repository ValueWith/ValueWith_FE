import * as S from './GroupNavSidebar.styles';

const RECRUIT_STEP = [
  {
    id: 1,
    title: '기본정보 입력',
  },
  {
    id: 2,
    title: '여행일정 등록',
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
  console.log(selectedStep);

  return (
    <S.RecruitSidebarContainer>
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
