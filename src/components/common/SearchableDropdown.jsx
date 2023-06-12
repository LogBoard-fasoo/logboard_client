import React from "react";
import { FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export default function SearchableDropdown({ isMulti = false, selectName, options, placeholder, onChangeFn }) {
    return (
        <FormControl>
            <Select
                isMulti={isMulti}
                name={selectName}
                options={options}
                placeholder={placeholder}
                onChange={(e) => onChangeFn(e?.value)}
            />
        </FormControl>
    );
}
