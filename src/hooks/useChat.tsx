import { useQuery } from 'react-query';
import { getMessages } from '@/apis/chat';

export const useGetMessages = (roomId: number, page: number) => {
  return useQuery(
    ['chatMessage', roomId, page],
    () => getMessages(roomId, page),
    {
      cacheTime: 0,
    }
  );
};

export default useGetMessages;
