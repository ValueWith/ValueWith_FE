import { useEffect, useState } from 'react';

import * as S from '../Uploader.styles';
import ErrorMessage from '../../Message/ErrorMessage';
import { SkeletonImage } from '../../SkeletonImage';
import { RiDragDropLine } from 'react-icons/ri';

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  onFileDeleted: () => void;
  storedImgUrl?: any;
  className?: string;
}

function FileUploader({
  onFileSelected,
  onFileDeleted,
  storedImgUrl,
  className,
}: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageList, setImageList] = useState(); //이미지 리스트

  useEffect(() => {
    setThumbnailUrl(storedImgUrl);
  }, [storedImgUrl]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleFileUpload = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    setUrl: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    event.preventDefault();

    setError(false);

    let file: File | undefined = undefined;
    setImageList(file);

    // 드래그 이벤트, input 이벤트
    if ('dataTransfer' in event) {
      file = event.dataTransfer?.files[0];
    } else {
      file = event.target.files?.[0];
    }

    // 파일이 없거나 이미지 파일이 아닌 경우 에러
    if (!file || !file.type.match(/image.*/) || file.type === 'image/gif')
      return setError(true);

    // 이미지 로드 후 썸네일 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setThumbnailUrl(reader.result);
        localStorage.setItem('groupThumbnail', reader.result);
      }
    };
    reader.readAsDataURL(file);
    onFileSelected(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(false);
    handleFileUpload(event, setThumbnailUrl);
  };

  const handleDeleteImage = () => {
    onFileDeleted && onFileDeleted();
    setThumbnailUrl(undefined);
  };

  return (
    <S.FileUploaderContainer className={className}>
      <S.FileDropZone
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={isHovered ? 'hover' : ''}
      >
        {!thumbnailUrl && !storedImgUrl ? (
          <>
            <RiDragDropLine className="dragIcon" />
            <p>
              그룹 커버 이미지를 올려주세요 <br />
              권장 이미지 사이즈: 500 x 300
            </p>
          </>
        ) : (
          <>
            {isLoading && <SkeletonImage />}
            <img
              src={thumbnailUrl || storedImgUrl}
              alt={'그룹 커버 이미지'}
              onLoad={handleImageLoad}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </>
        )}
      </S.FileDropZone>

      <S.FileFunctionContainer>
        <S.FileUploadInput
          id="fileUploader"
          type="file"
          accept="image/*"
          onChange={(event) => handleFileUpload(event, setThumbnailUrl)}
        />

        <S.FileUploaderLabel htmlFor="fileUploader">
          이미지 업로드
        </S.FileUploaderLabel>

        {(thumbnailUrl || storedImgUrl) && (
          <S.FileDeleteButton
            className="deleteButton"
            onClick={handleDeleteImage}
          >
            이미지 삭제
          </S.FileDeleteButton>
        )}
      </S.FileFunctionContainer>
      {error && <ErrorMessage>이미지 파일만 업로드 가능합니다.</ErrorMessage>}
    </S.FileUploaderContainer>
  );
}

export default FileUploader;
