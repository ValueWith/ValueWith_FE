import useGroupDataFetching from '@/hooks/useGroup';
import TripList from '../TripList';

function HomeTripList() {
  const params = {
    page: '1',
    status: 'open',
    area: 'all',
    sort: 'latest',
    title: '',
  };

  const { data, isLoading, isError } = useGroupDataFetching(params);

  const groupData = data?.tripGroups.slice(0, 8);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {groupData && <TripList groupData={groupData} />}
    </>
  );
}

export default HomeTripList;
