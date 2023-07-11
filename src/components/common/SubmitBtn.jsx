import React from "react";
import { Button } from "@chakra-ui/react";

export default function SubmimtBtn({ children, onClick, disabled = false }) {
    return (
        <Button colorScheme="blue" type="submit" my={3} onClick={onClick} isDisabled={disabled}>
            {children}
        </Button>
    );
}
