import React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

export default function CustomDateRangePicker() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
            setEndDate(null);
        } else {
            setEndDate(date);
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
                    value={startDate}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={handleStartDateChange}
                    label="시작일"
                    shouldDisableDate={shouldDisableDate}
                />

                <DatePickerStyle
                    value={endDate}
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
