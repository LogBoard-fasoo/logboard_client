import React from "react";
import ReconfirmDialog from "../components/common/ReconfirmDialog";
import { useDisclosure } from "@chakra-ui/react";

export default function useReconfirmDialog(title, content, handleSubmit) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const _ReconfirmDialog = () => (
        <ReconfirmDialog
            title={title}
            content={content}
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={handleSubmit}
        />
    );

    return [onOpen, _ReconfirmDialog];
}
