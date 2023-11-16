import { useQuery } from 'react-query';
import { getMessages } from '@/apis/chat';

export const useGetMessages = (
  roomId: number,
  untilDateTime: string,
  page: number
) => {
  return useQuery(
    ['chatMessage', roomId],
    () => getMessages(roomId, untilDateTime, page),
    {
      cacheTime: 0,
    }
  );
};

export default useGetMessages;
