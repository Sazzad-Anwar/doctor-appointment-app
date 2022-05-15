import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";

export default function CustomModal({ showModal, toggleModal, children }) {
  return ReactDOM.createPortal(
    <ModalWrapper showModal={showModal}>
      <Modal>
        <CloseButton onClick={toggleModal}>
          <GrClose />
        </CloseButton>
        {children}
      </Modal>
    </ModalWrapper>,
    document.getElementById("modal")
  );
}

export const ModalWrapper = styled.div`
  position: fixed;
  display: ${({ showModal }) => (showModal ? "flex" : "none")};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  justify-content: center;
  align-items: start;
  animation: popup 0.3s;
  @keyframes popup {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Modal = styled.div`
  position: relative;
  background-color: #fff;
  min-height: 30vh;
  min-width: 30vw;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  padding: 1% 2%;
  margin-top: 7%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 10px;
  background-color: #dddd;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #bbbb;
  }
`;
