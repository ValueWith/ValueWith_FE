import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const skeletonGradient = keyframes`
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
`;

const SkeletonUI = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const ImageWrap = styled(SkeletonUI)`
  max-width: 100%;
  height: 100%;
  background-size: 500px 500px;
  background-image: linear-gradient(
    to right,
    #f9f9f9 0%,
    #e6e6e6 20%,
    #f9f9f9 40%,
    #f9f9f9 100%
  );
  background-color: #f9f9f9;
  background-repeat: no-repeat;
  background-position: -500px 0;
  animation: ${skeletonGradient} 1s linear infinite;
`;

export const SkeletonImage = () => <ImageWrap />;
