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

  const {
    data: fetchGroupData,
    isLoading,
    isError,
  } = useGroupDataFetching(params);

  // const groupData = data?.tripGroups.slice(0, 8);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {fetchGroupData && <TripList groupData={fetchGroupData.tripGroups} />}
    </>
  );
}

export default HomeTripList;
