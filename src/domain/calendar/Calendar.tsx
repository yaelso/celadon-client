import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import './styles.css';

const UserCalendar: React.FC = () => {
    const [date, setDate] = useState(new Date());

    function onChange(nextValue) {
        setDate(nextValue);
    }

    return (
        <Calendar
            onChange={onChange}
            value={date}
        />
    );
};

export default UserCalendar;
