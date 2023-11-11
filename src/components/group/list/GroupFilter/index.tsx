import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';

import {
  AREA_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '@/constants/filterOption';

import RadioGroup from '@components/RadioGroup';

import * as S from './GroupFilter.styles';

interface GroupFilterProps {
  option: string;
}

function GroupFilter({ option }: GroupFilterProps) {
  const [params, setParams] = useRecoilState(paramsState);

  const handleStatusChange = (value: string) => {
    setParams({ ...params, status: value });
  };

  const handleAreaChange = (value: string) => {
    setParams({ ...params, area: value });
  };

  const handleSortingChange = (value: string) => {
    setParams({ ...params, sort: value });
  };

  return (
    <S.GroupFilterContainer className={option === 'filter' ? 'filter' : 'sort'}>
      {option === 'filter' && (
        <>
          <S.FilterTitle>모집현황</S.FilterTitle>
          <RadioGroup
            options={STATUS_OPTIONS}
            selectedValue={params.status}
            styleType='radio'
            onChange={handleStatusChange}
          />
          <S.FilterTitle>지역</S.FilterTitle>
          <RadioGroup
            options={AREA_OPTIONS}
            selectedValue={params.area}
            styleType='card'
            onChange={handleAreaChange}
          />
        </>
      )}
      {option === 'sort' && (
        <>
          <S.FilterTitle>정렬</S.FilterTitle>
          <RadioGroup
            options={SORT_OPTIONS}
            selectedValue={params.sort}
            styleType='radio'
            onChange={handleSortingChange}
          />
        </>
      )}
    </S.GroupFilterContainer>
  );
}

export default GroupFilter;