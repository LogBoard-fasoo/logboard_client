import React from "react";
import { Container, FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const companies = [
    { value: "fasoo", label: "fasoo" },
    { value: "sparrow", label: "sparrow" },
    { value: "clearbit", label: "clearbit" },
    { value: "amazon", label: "amazon" },
    { value: "google", label: "google" },
    { value: "naver", label: "naver" },
];

export default function SearchableDropdown() {
    return (
        <Container>
            <FormControl p={4}>
                <Select
                    isMulti
                    name="colors"
                    options={companies}
                    placeholder="기업을 검색할 수 있어요."
                    closeMenuOnSelect={false}
                />
            </FormControl>
        </Container>
    );
}
