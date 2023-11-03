import React from 'react';

import RadioGroup from '../RadioGroup';

import * as S from './GroupFilter.styles';

interface GroupFilterProps {
  option: string;
  recruitmentStatus: string;
  setRecruitmentStatus: React.Dispatch<React.SetStateAction<string>>;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  area: string;
  setArea: React.Dispatch<React.SetStateAction<string>>;
}

function GroupFilter({
  option,
  recruitmentStatus,
  setRecruitmentStatus,
  sorting,
  setSorting,
  area,
  setArea,
}: GroupFilterProps) {
  const recruitemStatusOptions = [
    { label: '전체보기', value: 'all' },
    { label: '모집중', value: 'recruiting' },
  ];

  const sortingOptions = [
    { label: '최신순', value: 'latest' },
    { label: '마감순', value: 'deadline' },
  ];

  const areaOptions = [
    { label: '전체', value: 'all' },
    { label: '강원', value: 'gangwon' },
    { label: '경기', value: 'gyeonggi' },
    { label: '경남', value: 'gyeongnam' },
    { label: '경북', value: 'gyeongbuk' },
    { label: '대구', value: 'daegu' },
    { label: '대전', value: 'daejeon' },
    { label: '부산', value: 'busan' },
    { label: '서울', value: 'seoul' },
    { label: '세종', value: 'sejong' },
    { label: '울산', value: 'ulsan' },
    { label: '인천', value: 'incheon' },
    { label: '전남', value: 'jeonnam' },
    { label: '전북', value: 'jeonbuk' },
    { label: '제주', value: 'jeju' },
    { label: '충남', value: 'chungcheongnam' },
    { label: '충북', value: 'chungcheongbuk' },
  ];

  const handleRecruitmentStatusChange = (value: string) => {
    setRecruitmentStatus(value);
  };

  const handleAreaChange = (value: string) => {
    setArea(value);
  };

  const handleSortingChange = (value: string) => {
    setSorting(value);
  };

  return (
    <S.GroupFilterContainer>
      {option === 'filter' && (
        <>
          <S.FilterTitle>모집현황</S.FilterTitle>
          <RadioGroup
            options={recruitemStatusOptions}
            selectedValue={recruitmentStatus}
            styleType='radio'
            onChange={handleRecruitmentStatusChange}
          />
          <S.FilterTitle>지역</S.FilterTitle>
          <RadioGroup
            options={areaOptions}
            selectedValue={area}
            styleType='card'
            onChange={handleAreaChange}
          />
        </>
      )}
      {option === 'sort' && (
        <>
          <S.FilterTitle>정렬</S.FilterTitle>
          <RadioGroup
            options={sortingOptions}
            selectedValue={sorting}
            styleType='radio'
            onChange={handleSortingChange}
          />
        </>
      )}
    </S.GroupFilterContainer>
  );
}

export default GroupFilter;
