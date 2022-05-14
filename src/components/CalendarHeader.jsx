import React, { useEffect, useMemo, useState } from 'react'
import { Button, Select } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { BsCalendarEvent } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectMonth, selectYear } from '../redux/features/DateReducer';
import CustomModal from './CustomModal';

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

    //Get the months array
    useEffect(() => {
        setMonths(new Array(12).fill({}).map((_, index) => ({ index: index + 1, name: dayjs().month(index).format('MMMM') })
        ))
        setYears(new Array(3).fill(null).map((_, index) => dayjs().year(getCurrentYear() + index).format('YYYY')))
    }, [])

    //If the input year and month is not valid then navigate to the current month and year
    useEffect(() => {
        // if (years.includes(updatedYear) && !months.filter(listMonth => listMonth.index.toString() === updatedMonth.toString()).length === 0) {
        dispatch(selectMonth(updatedMonth));
        dispatch(selectYear(updatedYear));
        // }

    }, [dispatch, updatedMonth, updatedYear, year, month])


    useEffect(() => {
        navigate(`/year/${updatedYear}/month/${updatedMonth}`)
    }, [updatedYear, updatedMonth, year, month])


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
            <CustomModal showModal={showModal} setShowModal={setShowModal} />
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