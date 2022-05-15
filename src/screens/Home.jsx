import React, { useEffect, useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const CalendarHeader = lazy(() => import("../components/CalendarHeader"));
import Month from "../components/Month";
import { getMonth } from "../components/utils";
import Loader from "../components/Loader";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { month, year } = useParams();

  useEffect(() => {
    setCurrentMonth(getMonth(month - 1, year));
  }, [month, year]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <CalendarHeader />
      </Suspense>
      <Wrapper>
        <Suspense fallback={<Loader />}>
          <Month month={currentMonth} />
        </Suspense>
      </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
`;
