import React from "react";
import { FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const companies = [
    { value: 0, label: "Fasoo" },
    { value: 1, label: "Sparrow" },
    { value: 2, label: "Clearbit" },
    { value: 3, label: "Amazon" },
    { value: 4, label: "Google" },
    { value: 5, label: "Naver" },
];

export default function SearchableDropdown() {
    return (
        <FormControl>
            <Select
                isMulti
                name="colors"
                options={companies}
                placeholder="기업을 검색할 수 있어요."
                closeMenuOnSelect={false}
            />
        </FormControl>
    );
}
