import React from "react";
import { Button } from "@chakra-ui/react";

export default function SubmimtBtn({ children, onClick }) {
    return (
        <Button colorScheme="blue" type="submit" my={3} onClick={onClick}>
            {children}
        </Button>
    );
}
