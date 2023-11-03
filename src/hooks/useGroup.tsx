import { useQuery } from 'react-query';
import { GroupListItem, GroupListParams, fetchGroupList } from '@/apis/group';

const useGroupDataFetching = (params: GroupListParams) => {
  return useQuery<GroupListItem, Error>('groupData', () =>
    fetchGroupList(params)
  );
};

export default useGroupDataFetching;
