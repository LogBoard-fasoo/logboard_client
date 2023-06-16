import React, { useState } from "react";
import SmoothTransition from "../../styles/animate/SmoothTransition";
import { Alert, Box } from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function AlertInfo({ title, content }) {
    const [isVisible, setIsVisible] = useState(false);

    function handleToggle() {
        setIsVisible(!isVisible);
    }

    return (
        <Alert status="warning" flexDirection={"column"} alignItems={"start"} fontSize={"sm"}>
            <Box onClick={handleToggle} width={"100%"} display={"flex"} alignItems={"center"}>
                {isVisible ? <FiChevronDown /> : <FiChevronUp />}
                &nbsp;&nbsp;
                <strong>{title}</strong>
            </Box>
            <Box px={2} maxW={"900px"}>
                {isVisible && (
                    <SmoothTransition>
                        <p>{content}</p>
                    </SmoothTransition>
                )}
            </Box>
        </Alert>
    );
}

// import React, { useState } from "react";
// import { Alert, AlertIcon, Box, CloseButton, Heading } from "@chakra-ui/react";

// export default function AlertInfo({ title, content }) {
//     const [isVisible, setIsVisible] = useState(true);

//     return (
//         <Alert status="info" opacity={"80%"} justifyContent={"space-between"}>
//             <Box onClick={setIsVisible((isVisible) => !isVisible)}>
//                 <CloseButton marginRight={4} />
//                 <Heading size={"lg"}>{title}</Heading>
//             </Box>
//             {isVisible && (
//                 <Box>
//                     <AlertIcon setIsVisible={false} />
//                     <p>{content}</p>
//                 </Box>
//             )}
//         </Alert>
//     );
// }
