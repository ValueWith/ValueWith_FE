import useGroupDataFetching from '@/hooks/useGroup';
import TripList from '../TripList';
import Loader from '../Loader';

function HomeTripList() {
  const params = {
    page: '1',
    status: 'open',
    area: 'all',
    sort: 'latest',
    title: '',
  };

  const { data, isLoading, isError } = useGroupDataFetching(params);

  return (
    <>
      {isLoading && <Loader className='mt-[340px]' />}
      {isError && <div>Error...</div>}
      {data && <TripList groupData={data.tripGroups.slice(0, 8)} />}
    </>
  );
}

export default HomeTripList;
