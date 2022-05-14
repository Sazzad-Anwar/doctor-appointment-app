import React from 'react'
import styled from 'styled-components';

export default function WeekDays({ day, rowId }) {
    if (rowId === 0) {
        return (
            <WeekDay>
                {day.format('ddd')}
            </WeekDay>
        )
    } else {
        return null
    }
}

export const WeekDay = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #828282;
    margin-bottom: 0.5rem;
`