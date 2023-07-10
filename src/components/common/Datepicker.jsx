import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { formatDate } from "../utils/formatDate";

export function CustomDatePicker({ isDisabled, setTimeline }) {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerStyle
                    renderInput={(params) => <TextField {...params} />}
                    onChange={setTimeline}
                    label="유효일"
                    disabled={isDisabled}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default function CustomDateRangePicker({ timeline, setTimeline, onlyAllow = 5 }) {
    const { startDate, endDate } = timeline;

    const handleStartDateChange = (date) => {
        setTimeline((timeline) => ({ ...timeline, startDate: formatDate(date) }));
    };

    const handleEndDateChange = (date) => {
        setTimeline((timeline) => ({ ...timeline, endDate: formatDate(date) }));
    };

    const shouldDisableDate = (date) => {
        if (!(date instanceof Date)) date = new Date(date);
        return date.getDay() !== onlyAllow;
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
                    shouldDisableDate={onlyAllow && shouldDisableDate}
                    maxDate={dayjs(endDate)}
                />

                <DatePickerStyle
                    value={dayjs(endDate)}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={handleEndDateChange}
                    label="종료일"
                    shouldDisableDate={onlyAllow && shouldDisableDate}
                    minDate={dayjs(startDate)}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

const DatePickerStyle = styled(DatePicker)`
    background-color: white;
`;
