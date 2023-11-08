import { useState } from 'react';

function useFileUpload(onFileSelected: (file: File) => void) {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    // Drag event
    if ('dataTransfer' in event) {
      const file = event.dataTransfer?.files[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setThumbnailUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    }

    // Input event
    else {
      const file = event.target.files?.[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setThumbnailUrl(reader.result);
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

  const handleDeleteImage = () => {
    setThumbnailUrl(undefined);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(false);
    handleFileUpload(event);
  };

  return {
    isLoading,
    thumbnailUrl,
    setThumbnailUrl,
    error,
    isHovered,
    handleImageLoad,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDeleteImage,
    handleDrop,
  };
}

export default useFileUpload;
