import { useState } from 'react';

import { calculateDday, formatDotDate } from '@/utils/dateUtil';
import { GroupMember } from '@/apis/groupDetail';
import TripCardUserInfo from '@components/TripCardUserInfo';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import * as S from './GroupMemberStatus.styles';

interface GroupMemberStatusProps {
  currentUserNumber: number;
  maxUserNumber: number;
  dueDate: string;
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
  groupMembers: GroupMember[];
}

function GroupMemberStatus({
  currentUserNumber,
  maxUserNumber,
  dueDate,
  profileUrl,
  nickName,
  age,
  gender,
  groupMembers,
}: GroupMemberStatusProps) {
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false);
  const d_day = calculateDday(dueDate);
  const dot_day = formatDotDate(dueDate);

  const handleClickDropdown = () => {
    setIsOpenStatusModal(!isOpenStatusModal);
  };

  return (
    <S.GroupMemberStatusContainer>
      <S.ContentDiv>
        <S.Title>모집현황</S.Title>
        <div className='flex items-center gap-[8px]'>
          <S.Content>
            {currentUserNumber}명 / {maxUserNumber}명
          </S.Content>
          <button onClick={handleClickDropdown}>
            {!isOpenStatusModal && <AiFillCaretDown />}
            {isOpenStatusModal && <AiFillCaretUp />}
          </button>
        </div>
        {isOpenStatusModal && (
          <S.GroupMemberStatusModal>
            <S.ModalTitle>함께하는 멤버</S.ModalTitle>
            {groupMembers &&
              groupMembers.map((member) => (
                <TripCardUserInfo
                  key={member.groupMemberNickname}
                  profileUrl={member.groupMemberProfileUrl}
                  nickName={member.groupMemberNickname}
                  age={member.groupMemberAge}
                  gender={member.groupMemberGender}
                  style={{ marginBottom: '5px', fontSize: '15px' }}
                />
              ))}
          </S.GroupMemberStatusModal>
        )}
      </S.ContentDiv>
      <S.ContentDiv>
        <S.Title>모집마감</S.Title>
        <S.Content>
          {dot_day} ({d_day})
        </S.Content>
      </S.ContentDiv>
      <div className='mt-[20px]'>
        <TripCardUserInfo
          profileUrl={profileUrl}
          nickName={nickName}
          age={Number(age)}
          gender={gender}
          style={{ fontSize: '15px' }}
        />
      </div>
    </S.GroupMemberStatusContainer>
  );
}

export default GroupMemberStatus;
