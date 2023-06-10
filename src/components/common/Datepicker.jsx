import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";

export default function CustomDateRangePicker({ timeline, setTimeline }) {
    const { startDate, endDate } = timeline;

    const handleStartDateChange = (date) => {
        setTimeline((timeline) => ({ ...timeline, startDate: date }));
        if (endDate && date > endDate) {
            setTimeline((timeline) => ({ ...timeline, startDate: null }));
        }
    };

    const handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
            setTimeline((timeline) => ({ ...timeline, endDate: null }));
        } else {
            setTimeline((timeline) => ({ ...timeline, endDate: date }));
        }
    };

    const shouldDisableDate = (date) => {
        if (!(date instanceof Date)) date = new Date(date);
        return date.getDay() !== 5;
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerStyle
                    value={dayjs(startDate)}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={handleStartDateChange}
                    label="시작일"
                    shouldDisableDate={shouldDisableDate}
                />

                <DatePickerStyle
                    value={dayjs(endDate)}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={handleEndDateChange}
                    label="종료일"
                    shouldDisableDate={shouldDisableDate}
                    minDate={startDate}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

const DatePickerStyle = styled(DatePicker)`
    background-color: white;
`;
