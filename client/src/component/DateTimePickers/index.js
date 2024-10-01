import 'dayjs/locale/vi';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickers({ onDateChange }) {
    const [value, setValue] = React.useState(dayjs());

    React.useEffect(() => {
        if (onDateChange) {
            onDateChange(value); // Gọi callback với giá trị mặc định khi component mount
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleDateChange = (newValue) => {
        setValue(newValue);
        if (onDateChange) {
            onDateChange(newValue); // Gọi callback để gửi giá trị lên App
        }
    };

    return (
        <React.Fragment>
            <style>
                {`
                    .col-3 > div > div:nth-child(2),
                    #StartDate > div:nth-child(3),
                    #EndDate > div:nth-child(3) {
                        padding-top: 0;
                    }
                    .col-3 input,
                    #StartDate input,
                    #EndDate input {
                        padding: 9px 14px;
                    }
                `}
            </style>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi" style={{ paddingTop: '0' }}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker value={value} onChange={handleDateChange}/>
                </DemoContainer>
            </LocalizationProvider>
        </React.Fragment>
    );
}