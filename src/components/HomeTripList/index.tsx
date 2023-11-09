import useGroupDataFetching from '@/hooks/useGroup';
import { paramsState } from '@/recoil/paramsState';
import { useRecoilState } from 'recoil';
import TripList from '../TripList';
import { useEffect } from 'react';

function HomeTripList() {
  const [params, setParams] = useRecoilState(paramsState);

  useEffect(() => {
    setParams({ ...params, status: 'open' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
