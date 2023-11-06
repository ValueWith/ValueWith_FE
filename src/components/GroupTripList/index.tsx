import useGroupDataFetching from '@/hooks/useGroup';
import { paramsState } from '@/recoil/paramsState';
import { useRecoilState } from 'recoil';
import TripList from '../TripList';

import * as S from './GroupTripList.styles';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

interface PageChangeCallback {
  selected: number;
}

function GroupTripList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useRecoilState(paramsState);

  const { data, isLoading, isError } = useGroupDataFetching(params);

  const groupData = data?.tripGroups;

  const handlePageClick = (data: PageChangeCallback) => {
    const selectedPage = data.selected;
    setParams({ ...params, page: String(selectedPage + 1) });
  };

  useEffect(() => {
    setParams({
      ...params,
      page: searchParams.get('page') || params.page,
      status: searchParams.get('status') || params.status,
      area: searchParams.get('area') || params.area,
      sort: searchParams.get('sort') || params.sort,
      title: searchParams.get('title') || params.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchParams({ ...params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {groupData && (
        <>
          <TripList groupData={groupData} />
          <S.PaginationContainer>
            <ReactPaginate
              previousLabel={'<'}
              previousClassName={'previous'}
              nextLabel={'>'}
              nextClassName={'next'}
              breakLabel={'...'}
              pageCount={data?.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              renderOnZeroPageCount={null}
              initialPage={Number(params.page) - 1}
            />
          </S.PaginationContainer>
        </>
      )}
    </>
  );
}

export default GroupTripList;
