import React from "react";
import { FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export default function SearchableDropdown({
    isMulti = false,
    selectName,
    options,
    placeholder,
    onChangeFn,
    w = "60%",
}) {
    return (
        <FormControl w={w}>
            <Select
                styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                isMulti={isMulti}
                name={selectName}
                options={options}
                placeholder={placeholder}
                onChange={onChangeFn}
            />
        </FormControl>
    );
}
