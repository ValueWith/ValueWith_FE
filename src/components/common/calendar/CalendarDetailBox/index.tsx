import { useState } from 'react';

import { MdOutlineArrowForwardIos } from 'react-icons/md';

import * as S from './CalendarDetailBox.styles';
import { useNavigate } from 'react-router-dom';

interface reviewContentModel {
  contentTitle: string;
  content: string;
}

interface CalendarDetailBoxProps {
  dayDatailInfo: {
    title: string;
    reviewContent: reviewContentModel;
    url: string;
  }[];
}

function CalendarDetailBox({ dayDatailInfo }: CalendarDetailBoxProps) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const handleSelectedItem = (index: number) => {
    if (selectedItem === index) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  return (
    <>
      <S.CalendarDetailBoxList>
        {dayDatailInfo.map((info, index) => (
          <S.CalendarDetailBoxItem key={index}>
            <S.DetailBoxHeader onClick={() => handleSelectedItem(index)}>
              <span>{info.title}</span>
              <MdOutlineArrowForwardIos fill={'#fff'} />
            </S.DetailBoxHeader>

            {selectedItem === index && (
              <S.DetilBoxContent>
                <S.DetailBoxReview
                  className={
                    info.reviewContent.content !== '' ? '' : 'noContent'
                  }
                >
                  {info.reviewContent.content !== '' ? (
                    <>
                      <S.DetailBoxReviewTitle>
                        {info.reviewContent.contentTitle}
                      </S.DetailBoxReviewTitle>
                      <div>{info.reviewContent.content}</div>
                    </>
                  ) : (
                    '아직 작성된 후기가 없습니다.'
                  )}
                </S.DetailBoxReview>
                <S.DetailBoxLinkBox>
                  <span onClick={() => navigate(info.url)}>그룹 보러가기</span>

                  {info.reviewContent ? (
                    <span onClick={() => console.log('상세 페이지 링크')}>
                      내 후기글 보러가기
                    </span>
                  ) : (
                    <span onClick={() => console.log('커뮤니티 페이지로')}>
                      후기글 작성하러 가기
                    </span>
                  )}
                </S.DetailBoxLinkBox>
              </S.DetilBoxContent>
            )}
          </S.CalendarDetailBoxItem>
        ))}
      </S.CalendarDetailBoxList>
    </>
  );
}

export default CalendarDetailBox;
