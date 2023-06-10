import React from "react";
import { Select } from "@chakra-ui/react";

export default function CustomDropdown({ placeholder, optionsDict, onChangeFn }) {
    return (
        <Select placeholder={placeholder} onChange={onChangeFn}>
            {optionsDict &&
                optionsDict.map((d) => (
                    <option key={d["index"]} value={d["index"]}>
                        {d["type"]}
                    </option>
                ))}
        </Select>
    );
}
