import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import { ModalBody, ModalTitle } from './CalendarHeader';

export default function Day({ day }) {
    const { month } = useParams();
    const [isToday, setIsToday] = useState(false);
    const [isThisMonth, setIsThisMonth] = useState(false);
    const [appointMentDetails, setAppointMentDetails] = useState({});
    const appointments = useSelector(state => state.appointments);
    const [appointmentDetails, setAppointmentDetails] = useState(appointments && appointments);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        if ((Number(day.format('DD')) === Number(dayjs().format('DD'))) && (Number(day.format('M')) === Number(dayjs().format('M'))) && (Number(day.format('YYYY')) === Number(dayjs().format('YYYY')))) {
            setIsToday(true);
        } else {
            setIsToday(false)
        }

        if (Number(day.format('M')) === Number(dayjs().month(month - 1).format('M'))) {
            setIsThisMonth(true);
        } else {
            setIsThisMonth(false);
        }

        setAppointmentDetails(appointments.filter(appointment => ((dayjs(appointment.date).format('MM')).toString() === (day.format('MM')).toString()) && ((dayjs(appointment.date).format('DD')).toString() === (day.format('DD')).toString())))

    }, [day, appointments])

    return (
        <>
            <DayWrapper>
                <DayCell
                    thisMonth={isThisMonth}
                    today={isToday}
                >
                    <DateInfo>
                        <DateText today={isToday}>
                            {day.format('DD')}
                        </DateText>
                        {appointmentDetails.length ? (
                            <TotalAppointment>
                                Appointments: {appointmentDetails.length}
                            </TotalAppointment>
                        ) : null}
                    </DateInfo>
                    {appointmentDetails.length ? (
                        <EventTagWrapper>
                            {appointmentDetails.map(appointment => (
                                <EventTag key={appointment.id} onClick={() => { setAppointMentDetails(appointment); toggleModal() }}>
                                    <UserDetails>
                                        {appointment.name}
                                    </UserDetails>
                                    <UserDetails>
                                        Age-{appointment.age}
                                    </UserDetails>
                                    <UserDetails>
                                        {appointment.time}
                                    </UserDetails>
                                </EventTag>
                            ))}
                        </EventTagWrapper>
                    ) : null}

                </DayCell>
            </DayWrapper>

            {/* Modal */}
            <CustomModal showModal={showModal} toggleModal={toggleModal}>
                <ModalTitle>
                    Appointment Details of {appointMentDetails.name}
                </ModalTitle>
                <ModalBody>
                    <ModalContent>
                        <p>Name: <b>{appointMentDetails.name}</b></p>
                        <p>Age: <b>{appointMentDetails.age}</b></p>
                        <p>Gender: <b>{appointMentDetails.gender}</b></p>
                        <p>Appointment Date: <b>{appointMentDetails.date}</b></p>
                        <p>Appointment Time: <b>{appointMentDetails.time}</b></p>
                    </ModalContent>
                </ModalBody>
            </CustomModal>
        </>
    )
}

export const DayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
`

export const DayCell = styled.div`
    font-size: 14px;
    font-weight: bold;
    color:${({ today }) => today ? '#213fd9' : '#000'};
    border:1px solid #dddd;
    height: 150px;
    width: 100% ;
    overflow: hidden;
    transition: all .3s ease-in-out;
    cursor: pointer;
    background-color:${({ thisMonth, today }) => {
        if (today && thisMonth) {
            return '#dddd'
        }
        else if (thisMonth && !today) {
            return '#eeee'
        }
        else {
            return '#ffff'
        }

    }};
    :hover{
        background-color: #dddd;
    }
`

export const DateText = styled.p`
    margin-bottom: 0px;
    padding: 10px;
    border-radius: 50%;
    color: ${({ today }) => today ? '#fff' : '#000'};
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: ${({ today }) => today ? '#213fd9' : 'transparent'};
`

export const DateInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const TotalAppointment = styled.p`
    font-weight: 500;
    margin-bottom: 0px;
    margin-right: 10px;
`

export const EventTagWrapper = styled.div`
    height:  80%;
    overflow-y:auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: .3rem;
    }
    ::-webkit-scrollbar-track {
        box-shadow: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #aaaa;
        outline: 1px solid #eeee;
        border-radius: 7px;
    }
`

export const EventTag = styled(Button)`
    padding: .3rem 1.5rem;
    text-align: left;
    margin-bottom: 3px;
    color: #ffff;
    font-size: 14px;
    width: 100%;
    background-color: #1890ff;
`

export const Details = styled.span`
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important; 
`

export const UserDetails = styled.span`
    font-weight: bold;
    margin-right: .5rem;
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    & p{
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 7px
    }
`