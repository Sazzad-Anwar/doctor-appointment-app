import React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr'

export default function CustomModal({ showModal, setShowModal }) {
    return (
        <ModalWrapper showModal={showModal}>
            <Modal>
                <CloseButton onClick={() => setShowModal(false)}>
                    <GrClose />
                </CloseButton>
                <h1>hello</h1>
            </Modal>
        </ModalWrapper>
    )
}

export const ModalWrapper = styled.div`
    position: fixed;
    display: ${({ showModal }) => showModal ? 'flex' : 'none'};
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    justify-content: center;
    align-items: start;
    animation: popup .3s;
    @keyframes popup {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const Modal = styled.div`
    position: relative;
    background-color: #fff;
    height: 30vh;
    width: 50vw;
    border-radius: 10px;
    padding: 2% 4%;
    margin-top: 7%;
`

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
    transition: all .3s ease-in-out;
    cursor: pointer;
    :hover{
        background-color: #bbbb;
    }
`