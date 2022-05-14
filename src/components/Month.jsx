import React, { Fragment } from 'react'
import styled from 'styled-components'
import Day from './Day'
import WeekDays from './WeekDays'

export default function Month({ month }) {

    return (
        <>
            <WeekDayWrapper>
                {month.map((row, i) => (
                    <Fragment key={i}>
                        {row.map((day, j) => (
                            <Fragment key={j}>
                                <WeekDays day={day} rowId={i} />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </WeekDayWrapper>
            <MonthWrapper>
                {month.map((row, i) => (
                    <Fragment key={i}>
                        {row.map((day, j) => (
                            <Fragment key={j}>
                                <Day day={day} />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </MonthWrapper>
        </>
    )
}

export const MonthWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    flex: 1 1 0%;
`

export const WeekDayWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    flex: 1 1 0%;
    margin-bottom: 1rem;
`