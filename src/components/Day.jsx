import dayjs from "dayjs";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";
import { useSelector } from "react-redux";
const CustomModal = lazy(() => import("./CustomModal"));
import { ModalBody, ModalTitle } from "./CalendarHeader";
import Loader from "./Loader";

export default function Day({ day }) {
  const { month } = useParams();
  const [isToday, setIsToday] = useState(false);
  const [isThisMonth, setIsThisMonth] = useState(false);
  const [appointMentDetails, setAppointMentDetails] = useState({});
  const appointments = useSelector((state) => state.appointments);
  const [appointmentArray, setAppointmentArray] = useState(
    appointments && appointments
  );
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (
      Number(day.format("DD")) === Number(dayjs().format("DD")) &&
      Number(day.format("M")) === Number(dayjs().format("M")) &&
      Number(day.format("YYYY")) === Number(dayjs().format("YYYY"))
    ) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }

    if (
      Number(day.format("M")) ===
      Number(
        dayjs()
          .month(month - 1)
          .format("M")
      )
    ) {
      setIsThisMonth(true);
    } else {
      setIsThisMonth(false);
    }

    setAppointmentArray(
      appointments.filter(
        (appointment) =>
          dayjs(appointment.date).format("MM").toString() ===
            day.format("MM").toString() &&
          dayjs(appointment.date).format("DD").toString() ===
            day.format("DD").toString() &&
          dayjs(appointment.date).format("YYYY").toString() ===
            day.format("YYYY").toString()
      )
    );
  }, [day, appointments]);

  return (
    <>
      <DayWrapper>
        <DayCell thisMonth={isThisMonth} today={isToday}>
          <DateInfo>
            <DateText today={isToday}>{day.format("DD")}</DateText>
            {appointmentArray.length ? (
              <TotalAppointment>
                Appointments: {appointmentArray.length}
              </TotalAppointment>
            ) : null}
          </DateInfo>
          {appointmentArray.length ? (
            <EventTagWrapper>
              {[...appointmentArray]
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((appointment) => (
                  <EventTag
                    key={appointment.id}
                    onClick={() => {
                      setAppointMentDetails(appointment);
                      toggleModal();
                    }}
                  >
                    <UserDetails>{appointment.name}</UserDetails>
                    <UserDetails>{appointment.time}</UserDetails>
                  </EventTag>
                ))}
            </EventTagWrapper>
          ) : null}
        </DayCell>
      </DayWrapper>

      {/* Modal */}
      <Suspense fallback={<Loader />}>
        <CustomModal showModal={showModal} toggleModal={toggleModal}>
          <ModalTitle>Appointment Details</ModalTitle>
          <ModalBody>
            <ModalContent>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      : <b>{appointMentDetails.name}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>
                      : <b>{appointMentDetails.age}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>
                      : <b>{appointMentDetails.gender}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      : <b>{appointMentDetails.date}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>
                      : <b>{appointMentDetails.time}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <CloseButton>
                <Button type="primary" size="middle" onClick={toggleModal}>
                  Close
                </Button>
              </CloseButton>
            </ModalContent>
          </ModalBody>
        </CustomModal>
      </Suspense>
    </>
  );
}

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

export const DayCell = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ today }) => (today ? "#213fd9" : "#000")};
  border: 1px solid #dddd;
  height: 150px;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: ${({ thisMonth, today }) => {
    if (today && thisMonth) {
      return "#dddd";
    } else if (thisMonth && !today) {
      return "#eeee";
    } else {
      return "#ffff";
    }
  }};
  :hover {
    background-color: #dddd;
  }
  @media (max-width: 1600px) {
    height: 100px;
  }
`;

export const DateText = styled.p`
  margin-bottom: 0px;
  padding: 10px;
  border-radius: 50%;
  color: ${({ today }) => (today ? "#fff" : "#000")};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ today }) => (today ? "#213fd9" : "transparent")};
`;

export const DateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalAppointment = styled.p`
  font-weight: 500;
  margin-bottom: 0px;
  margin-right: 10px;
`;

export const EventTagWrapper = styled.div`
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #aaaa;
    outline: 1px solid #eeee;
    border-radius: 7px;
  }
`;

export const EventTag = styled(Button)`
  padding: 0.3rem 1rem;
  text-align: left;
  margin-bottom: 3px;
  color: #ffff;
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1890ff;
`;

export const Details = styled.span`
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  white-space: nowrap !important;
`;

export const UserDetails = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  :nth-child(1) {
    max-width: 14ch;
  }
  @media (max-width: 1600px) {
    :nth-child(1) {
      max-width: 8ch;
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  table {
    border: none;
    width: 100%;
  }
  table td:nth-child(1) {
    width: 30%;
  }
  table td:nth-child(2) {
    width: 70%;
  }
  table td {
    font-size: 19px;
    font-weight: 500;
    padding: 5px 0;
    color: #6e6d6d;
  }
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 0.5rem;
`;
