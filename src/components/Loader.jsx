import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import styled from "styled-components";

export default function Loader() {
  return (
    <LoaderWrapper>
      <Icon size={30} />
    </LoaderWrapper>
  );
}

export const LoaderWrapper = styled.div`
  min-height: 120px;
  min-width: 120px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(BiLoaderCircle)`
  animation: rotate 4s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
