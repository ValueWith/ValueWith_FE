import { useState } from 'react';

import * as S from '../Uploader.styles';
import ErrorMessage from '@/components/Message/ErrorMessage';
import { SkeletonImage } from '@/components/SkeletonImage';
import { RiAddFill } from 'react-icons/ri';

export interface ProfileUploaderCSSProps {
  className?: string;
}

interface ProfileUploaderProps extends ProfileUploaderCSSProps {
  onFileSelected: (file: File) => void;
  storedImgUrl?: string;
}

function ProfileUploader({
  onFileSelected,
  storedImgUrl,
  className,
}: ProfileUploaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showImage, setShowImage] = useState(true);

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

    setShowImage(true);

    // 드래그 이벤트
    if ('dataTransfer' in event) {
      const file = event.dataTransfer?.files[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    }

    // Input 이벤트
    else {
      const file = event.target.files?.[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    }
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
    setThumbnailUrl(undefined);
    setShowImage(false);
  };

  return (
    <S.FileUploaderContainer className={`profile ${className}`}>
      <div className="relative inline-flex">
        <S.FileDropZone
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={isHovered ? 'hover' : ''}
        >
          {!thumbnailUrl && !storedImgUrl ? null : (
            <>
              {isLoading && <SkeletonImage />}
              <img
                src={thumbnailUrl || storedImgUrl}
                alt="스터디 그룹 커버 이미지"
                onLoad={handleImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </>
          )}
        </S.FileDropZone>

        <S.FileUploaderLabel htmlFor="fileUploader">
          <RiAddFill fill="#fff" />
        </S.FileUploaderLabel>
      </div>

      <S.FileFunctionContainer>
        <S.FileUploadInput
          id="fileUploader"
          type="file"
          accept="image/*"
          onChange={(event) => handleFileUpload(event, setThumbnailUrl)}
        />

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

export default ProfileUploader;
