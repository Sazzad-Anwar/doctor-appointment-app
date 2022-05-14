import { Result, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectDay, selectMonth, selectYear } from '../redux/features/DateReducer';
import dayjs from 'dayjs';

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return <Result
        status="403"
        title="403"
        subTitle="Sorry, you have entered wrong date."
        extra={<Button type="primary" onClick={() => {
            navigate('/');
            dispatch(selectDay(dayjs().date(dayjs().date()).format('DD')))
            dispatch(selectYear(dayjs().date(dayjs().date()).format('YYYY')))
            dispatch(selectMonth(dayjs().date(dayjs().date()).format('M')))
        }}>
            Back Home
        </Button>}
    />
};