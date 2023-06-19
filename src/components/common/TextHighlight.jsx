import { Highlight } from "@chakra-ui/react";

export default function TextHighlight({ children }) {
    return (
        <Highlight query="spotlight" styles={{ px: "1", py: "1", bg: "orange.100" }}>
            {children}
        </Highlight>
    );
}
