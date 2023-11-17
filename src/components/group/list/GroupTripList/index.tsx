import { useRecoilState } from 'recoil';
import ReactPaginate from 'react-paginate';

import useGroupDataFetching from '@/hooks/useGroup';
import { paramsState } from '@/recoil/paramsState';
import TripList from '@components/TripList';

import * as S from './GroupTripList.styles';
import Loader from '@components/Loader';

interface PageChangeCallback {
  selected: number;
}

function GroupTripList() {
  const [params, setParams] = useRecoilState(paramsState);

  const { data, isLoading, isError } = useGroupDataFetching(params);

  const groupData = data?.tripGroups;

  const handlePageClick = (data: PageChangeCallback) => {
    const selectedPage = data.selected;
    setParams({ ...params, page: String(selectedPage + 1) });
  };

  return (
    <>
      {isError && <div>Error...</div>}
      {isLoading && <Loader />}
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
              forcePage={Number(params.page) - 1}
            />
          </S.PaginationContainer>
        </>
      )}
    </>
  );
}

export default GroupTripList;
