import {
  areaOptions,
  sortingOptions,
  statusOptions,
} from '@/constants/filterOption';

import RadioGroup from '../RadioGroup';

import * as S from './GroupFilter.styles';
import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';

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
            options={statusOptions}
            selectedValue={params.status}
            styleType="radio"
            onChange={handleStatusChange}
          />
          <S.FilterTitle>지역</S.FilterTitle>
          <RadioGroup
            options={areaOptions}
            selectedValue={params.area}
            styleType="card"
            onChange={handleAreaChange}
          />
        </>
      )}
      {option === 'sort' && (
        <>
          <S.FilterTitle>정렬</S.FilterTitle>
          <RadioGroup
            options={sortingOptions}
            selectedValue={params.sort}
            styleType="radio"
            onChange={handleSortingChange}
          />
        </>
      )}
    </S.GroupFilterContainer>
  );
}

export default GroupFilter;
