import { useQuery } from 'react-query';
import { GroupListParams } from './group';
import instance from '.';
import { useEffect } from 'react';

/**
 *
 * @param { string } params
 * leader : 내가 그룹장인 여행그룹,
 * approved : 승인된 여행그룹,
 * pending : 승인 대기중인 여행그룹
 */
export const getGroupList = (params: GroupListParams) => {
  if (params.status === 'bookmark') {
    return instance.get(
      import.meta.env.VITE_SERVER_URL + '/groups/list/my-bookmark',
      {
        params: {
          page: params.page,
        },
      }
    );
  }
  return instance.get(
    import.meta.env.VITE_SERVER_URL + '/groups/list/my-list',
    {
      params,
    }
  );
};

// 멤버 조회 (그룹장)
export const getGroupMemberList = (status: string, tripGroupId: number) => {
  return instance.get(
    import.meta.env.VITE_SERVER_URL +
      `/groups/members/${tripGroupId}?status=${status}`
  );
};

// 멤버 승인 (그룹장)
export const memberConfirmRequest = (groupMemberId: number) => {
  return instance.patch(
    import.meta.env.VITE_SERVER_URL +
      `/groups/application/confirm/${groupMemberId}`
  );
};

// 멤버 거절 (그룹장)
export const memberRejectRequest = (groupMemberId: number) => {
  return instance.patch(
    import.meta.env.VITE_SERVER_URL +
      `/groups/application/reject/${groupMemberId}`
  );
};

// 멤버 강퇴 (그룹장)
export const memberKickRequest = (
  tripGroupId: number,
  groupMemberId: number
) => {
  return instance.patch(
    import.meta.env.VITE_SERVER_URL +
      `/groups/${tripGroupId}/member/${groupMemberId}/banned`
  );
};

// 프로필 편집 - 유저 정보 조회
export const getProfileRequest = () => {
  return instance.get(import.meta.env.VITE_SERVER_URL + `/member`);
};

// 프로필 편집 - 유저 정보 수정
export const editProfileRequest = (memberId: any, formData: any) => {
  return instance.put(
    import.meta.env.VITE_SERVER_URL + `/member/${memberId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
