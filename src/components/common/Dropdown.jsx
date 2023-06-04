import React from "react";
import { Select } from "@chakra-ui/react";

export default function CustomDropdown({ placeholder, optionsDict }) {
    return (
        <Select placeholder={placeholder}>
            {Object.entries(optionsDict).map((d, idx) => (
                <option key={idx} value={d[1]}>
                    {d[1]}
                </option>
            ))}
        </Select>
    );
}
