import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CalendarHeader from '../components/CalendarHeader'
import Month from '../components/Month'
import { getMonth } from '../components/utils'

export default function Home() {

    const [currentMonth, setCurrentMonth] = useState(getMonth());
    // const { month } = useSelector(state => state.selectedDate);
    const { month, year } = useParams()

    useEffect(() => {
        setCurrentMonth(getMonth(month - 1, year));
    }, [month, year])

    return (
        <>
            <CalendarHeader />
            <Wrapper>
                <Month month={currentMonth} />
            </Wrapper>
        </>
    )
}

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 2rem;
`