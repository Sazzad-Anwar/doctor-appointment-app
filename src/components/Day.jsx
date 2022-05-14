import dayjs from 'dayjs';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

export default function Day({ day }) {
    const { month, year } = useParams();

    return (
        <DayWrapper>
            <DayCell
                thisMonth={Number(day.format('M')) === Number(dayjs().month(month - 1).format('M'))}
                today={Number(day.format('DD')) === Number(dayjs().format('DD')) && Number(day.format('M')) === Number(dayjs().format('M')) && Number(day.format('YYYY') === Number(dayjs().format('YYYY')))}
            >
                <DateP>
                    {day.format('DD')}
                </DateP>
                {Number(day.format('M')) === 5 && Number(day.format('DD')) === 12 && (
                    <EventTagWrapper>
                        <EventTag>
                            {'Doctor Booked Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus cum voluptatum molestias voluptate aspernatur harum in quae reprehenderit, asperiores explicabo, nisi numquam dicta quos ut labore inventore modi pariatur aut'.slice(0, 25).concat('...')}
                        </EventTag>
                        <EventTag>
                            {'Doctor Booked Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus cum voluptatum molestias voluptate aspernatur harum in quae reprehenderit, asperiores explicabo, nisi numquam dicta quos ut labore inventore modi pariatur aut'.slice(0, 25).concat('...')}
                        </EventTag>
                        <EventTag>
                            {'Doctor Booked Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus cum voluptatum molestias voluptate aspernatur harum in quae reprehenderit, asperiores explicabo, nisi numquam dicta quos ut labore inventore modi pariatur aut'.slice(0, 25).concat('...')}
                        </EventTag>
                        <EventTag>
                            {'Doctor Booked Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus cum voluptatum molestias voluptate aspernatur harum in quae reprehenderit, asperiores explicabo, nisi numquam dicta quos ut labore inventore modi pariatur aut'.slice(0, 25).concat('...')}
                        </EventTag>
                        <EventTag>
                            {'Doctor Booked Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus cum voluptatum molestias voluptate aspernatur harum in quae reprehenderit, asperiores explicabo, nisi numquam dicta quos ut labore inventore modi pariatur aut'.slice(0, 25).concat('...')}
                        </EventTag>
                    </EventTagWrapper>
                )}
            </DayCell>
        </DayWrapper>
    )
}

export const DayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
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

export const DateP = styled.p`
    margin-bottom: 0px;
`

export const EventTagWrapper = styled.div`
    height:  130px;
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
    background-color: #1890ff;
`

export const Details = styled.span`
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important; 
`