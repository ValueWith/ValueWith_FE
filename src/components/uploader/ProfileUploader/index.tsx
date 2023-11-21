import { useEffect, useState } from 'react';

import * as S from '../Uploader.styles';
import ErrorMessage from '@/components/Message/ErrorMessage';
import { SkeletonImage } from '@/components/SkeletonImage';
import { RiAddFill } from 'react-icons/ri';
import useFileUpload from '@/hooks/useFileUploader';

export interface ProfileUploaderCSSProps {
  className?: string;
}

interface ProfileUploaderProps extends ProfileUploaderCSSProps {
  onFileSelected: (file: File) => void;
  onFileDeleted: () => void;
  storedImgUrl?: string;
}

function ProfileUploader({
  onFileSelected,
  onFileDeleted,
  storedImgUrl,
  className,
}: ProfileUploaderProps) {
  const {
    isLoading,
    thumbnailUrl,
    error,
    isHovered,
    handleImageLoad,
    handleFileUpload,
    handleDeleteImage,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileUpload(onFileSelected, onFileDeleted);

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
                alt="프로필 커버 이미지"
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
          onChange={(event) => handleFileUpload(event)}
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
