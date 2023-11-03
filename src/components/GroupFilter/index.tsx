import React from 'react';

import {
  areaOptions,
  sortingOptions,
  statusOptions,
} from '@/constants/filterOption';

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
            options={statusOptions}
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
