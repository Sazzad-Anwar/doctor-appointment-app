import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
export default function RootRoute() {

    let { month, year } = useSelector(state => state.selectedDate);

    return <Navigate to={`/year/${year}/month/${month}`} />
}
