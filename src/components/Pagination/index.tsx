import ReactPaginate from 'react-paginate';
import * as S from './Pagination.styles';

interface PagenationProps {
  page: number;
  pageCount: number;
  handlePageClick: (data: { selected: number }) => void;
}

function Pagenation({ page, pageCount, handlePageClick }: PagenationProps) {
  return (
    <S.PaginationContainer>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousClassName={'pageLabelBtn'}
        nextClassName={'pageLabelBtn'}
        renderOnZeroPageCount={null}
        forcePage={Number(page) - 1}
      />
    </S.PaginationContainer>
  );
}

export default Pagenation;
