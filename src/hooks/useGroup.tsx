import { useQuery } from 'react-query';
import { fetchData } from '@/apis/group';

const useGroupDataFetching = () => {
  return useQuery('groupData', fetchData);
};

export default useGroupDataFetching;
