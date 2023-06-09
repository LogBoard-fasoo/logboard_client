import React from "react";
import { FormControl, Heading } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export default function SearchableDropdown({ isMulti = false, selectName, options, placeholder, onChangeFn }) {
    return (
        <FormControl w="60%">
            <Select
                isMulti={isMulti}
                name={selectName}
                options={options}
                placeholder={placeholder}
                onChange={onChangeFn}
            />
        </FormControl>
    );
}
