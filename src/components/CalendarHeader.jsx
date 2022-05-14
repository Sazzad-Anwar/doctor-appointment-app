import React, { useEffect, useState } from 'react'
import { Button, Select, Input, InputNumber, TimePicker, DatePicker, Radio } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { BsCalendarEvent } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectMonth, selectYear } from '../redux/features/DateReducer';
import CustomModal from './CustomModal';
import { useForm, Controller } from "react-hook-form";
import { createAppointment } from '../redux/features/AppointmentReducer';
import { v4 as uuidv4 } from 'uuid';
import { FiAlertTriangle } from 'react-icons/fi';

const { Option } = Select;

export default function CalendarHeader() {

    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const dispatch = useDispatch();
    const { year, month } = useParams();
    const [updatedYear, setUpdatedYear] = useState(year && year);
    const [updatedMonth, setUpdatedMonth] = useState(month && month);
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    //Get Current month function
    const getCurrentMonth = () => {
        return dayjs().month(dayjs().month()).format('M')
    }

    //Get current year function
    const getCurrentYear = () => {
        return dayjs().year()
    }

    //Convert the month number to string
    const getMonthString = (month) => {
        if (month) {
            return dayjs().month(month - 1).format('MMMM')
        } else {
            return dayjs().month(dayjs().month()).format('MMMM')
        }
    }

    //Update the month selection then navigate to the selected month
    const selectMonthHandler = (value) => {
        let updatedMonthInput = dayjs().month(months.find(month => month.name === value).index - 1).format('M')
        dispatch(selectMonth(updatedMonthInput));
        setUpdatedMonth(updatedMonthInput)
    }

    //Update the year selection then navigate to the selected year
    const selectYearHandler = (value) => {
        let updatedYearInput = dayjs().year(value).format('YYYY')
        dispatch(selectYear(updatedYearInput));
        setUpdatedYear(updatedYearInput);
    }

    //hide modal
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    //Make appointment form submit
    const onSubmit = data => {
        data.date = dayjs(data.date).format('YYYY-MM-DD');
        data.time = dayjs(data.time).format('h:mm A');
        data.id = uuidv4();
        dispatch(createAppointment(data));
        toggleModal()
    }

    //Get the months array
    useEffect(() => {
        setMonths(new Array(12).fill({}).map((_, index) => ({ index: index + 1, name: dayjs().month(index).format('MMMM') })
        ))
        setYears(new Array(3).fill(null).map((_, index) => dayjs().year(getCurrentYear() + index).format('YYYY')))
    }, [])

    //If the input year and month is not valid then navigate to the current month and year
    useEffect(() => {
        dispatch(selectMonth(updatedMonth));
        dispatch(selectYear(updatedYear));
        navigate(`/year/${updatedYear}/month/${updatedMonth}`)
    }, [updatedYear, updatedMonth, year, month, dispatch])


    return (
        <>
            <Wrapper>
                <Select defaultValue={getMonthString(month)} onChange={selectMonthHandler}>
                    {months.map(month => (
                        <Option key={month.name} value={month.name}>
                            {month.name}
                        </Option>
                    ))}
                </Select>
                <Select defaultValue={year} onChange={selectYearHandler}>
                    {years.map(year => (
                        <Option key={`year-${year}`} value={year}>
                            {year}
                        </Option>
                    ))}
                </Select>
                <Button
                    type='primary'
                    prefix={<BsCalendarEvent />}
                    onClick={() => setShowModal(true)}
                >
                    Create Appointment
                </Button>
                {!years.includes(updatedYear) || (months.filter(listMonth => listMonth.index.toString() === updatedMonth.toString()).length === 0) && <Navigate to={`/error`} />}
            </Wrapper>

            {/* Modal */}
            <CustomModal showModal={showModal} toggleModal={toggleModal}>
                <ModalTitle>
                    Create Appointment
                </ModalTitle>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputDiv>
                            <InputLabel>Name</InputLabel>
                            <TextInput placeholder="Write your name" {...register('name', { required: true })} />
                            {errors.name && <ErrorMessage><FiAlertTriangle /> Name is required</ErrorMessage>}
                        </InputDiv>
                        <InputDiv>
                            <InputLabel>Gender</InputLabel>
                            <Radio.Group {...register("gender", { required: true })}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                                <Radio value='other'>Other</Radio>
                            </Radio.Group>
                            {errors.gender && <ErrorMessage><FiAlertTriangle /> Gender is required</ErrorMessage>}
                        </InputDiv>
                        <InputDiv>
                            <InputLabel>Age</InputLabel>
                            <TextInput type="number" placeholder='Set your age' {...register('age', { required: true })} />
                            {errors.age && <ErrorMessage><FiAlertTriangle /> Age is required</ErrorMessage>}
                        </InputDiv>
                        <InputDiv>
                            <InputLabel>Select Date</InputLabel>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <DatePicker {...field} size='large' />}
                            />
                            {errors.date && <ErrorMessage><FiAlertTriangle /> Date is required</ErrorMessage>}
                        </InputDiv>
                        <InputDiv>
                            <InputLabel>Select Time</InputLabel>
                            <Controller
                                name="time"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <TimePicker {...field} size='large' use12Hours format="h:mm a" />}
                            />
                            {errors.time && <ErrorMessage><FiAlertTriangle /> Time is required</ErrorMessage>}

                        </InputDiv>

                        <FooterButton>
                            <Button type="default" size='middle' style={{ marginRight: '1rem' }} onClick={toggleModal}>Cancel</Button>
                            <Button htmlType='submit' type="primary" size='middle'>Save</Button>
                        </FooterButton>
                    </form>
                </ModalBody>
            </CustomModal>
        </>
    )
}

export const Wrapper = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    & > * {
        margin-right: 1rem;
        min-width: 150px;
        width: auto;
    }
`

export const ModalTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
`

export const ModalBody = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 1rem;
`

export const InputDiv = styled.div`
    margin: .5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const TextInput = styled.input`
    margin-top: .3rem;
    width: 100%;
    height: 2.5rem;
    padding: .5rem 1rem;
    border: 1px solid #dddd;
    transition: all .4s ease-in-out;
    :focus{
        outline: none;
        border: 1px solid #bbbb;
    }
`

export const AgeInput = styled(InputNumber)`
    margin-top: .3rem;
    width: 100%;
`

export const InputLabel = styled.label`
    font-size: 18px;
`

export const FooterButton = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 2rem;
`

export const ErrorMessage = styled.p`
    color: #FF1C1C;
    /* background-color: #FFD0D0; */
    /* padding: .5rem 1.5rem; */
    /* border: 1px solid #FFD0D0; */
    margin: .5rem 0;
`