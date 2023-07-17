import React from "react";
import { Button } from "@chakra-ui/react";

export default function GeneralBtn({ children, onClick, disabled = false, colorScheme }) {
    return (
        <Button colorScheme={colorScheme} type="submit" my={3} onClick={onClick} isDisabled={disabled}>
            {children}
        </Button>
    );
}
