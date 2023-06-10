import React from "react";
import { Select } from "@chakra-ui/react";

export default function CustomDropdown({ placeholder, optionsDict }) {
    return (
        <Select placeholder={placeholder}>
            {optionsDict &&
                optionsDict.map((d) => (
                    <option key={d["index"]} value={d["type"]}>
                        {d["type"]}
                    </option>
                ))}
        </Select>
    );
}
