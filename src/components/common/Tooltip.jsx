import React from "react";
import { Center, Icon, Tooltip } from "@chakra-ui/react";
import { FiHelpCircle } from "react-icons/fi";

export default function CustomTooltip({ tooltipContent }) {
    return (
        <Tooltip hasArrow label={tooltipContent} placement="right-start" bg="red.50" color="black" fontSize="lg">
            <span>
                <Icon as={FiHelpCircle} boxSize={5} color="red.300" ml={1} pt={1} />
            </span>
        </Tooltip>
    );
}
