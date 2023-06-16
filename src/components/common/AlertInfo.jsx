import React, { useState } from "react";
import SmoothTransition from "../../styles/animate/SmoothTransition";
import { Alert, Box } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

export default function AlertInfo({ title, content }) {
    const [closed, setClosed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function handleToggle() {
        setIsVisible(!isVisible);
    }

    return (
        !closed && (
            <Alert status="warning" flexDirection={"column"} fontSize={"sm"}>
                <Box onClick={handleToggle} width={"100%"} display={"flex"} alignItems={"center"}>
                    <Box display={"flex"} w={"100%"} alignItems={"center"}>
                        {isVisible ? <FiChevronUp /> : <FiChevronDown />}
                        &nbsp;&nbsp;
                        <strong>{title}</strong>
                    </Box>
                    <FiX onClick={setClosed} />
                </Box>
                <Box w={"100%"} px={2}>
                    {isVisible && (
                        <SmoothTransition>
                            <p>{content}</p>
                        </SmoothTransition>
                    )}
                </Box>
            </Alert>
        )
    );
}
