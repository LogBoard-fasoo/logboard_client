import React from "react";
import html2pdf from "html2pdf.js";
import { Button } from "@chakra-ui/react";
import { formatDate } from "../utils/formatDate";

function generatePDF() {
    const elements = [
        "css-1jb3vzl",
        "css-1idwstw",
        "css-1jb3vzl",
        "css-1idwstw",
        "css-1jb3vzl",
        "css-1idwstw",
        "css-1jb3vzl",
        "css-1jb3vzl",
    ];

    const wrapper = document.createElement("div");
    const br = document.createElement("div");

    for (let path of elements) {
        const e = document.getElementsByClassName(path)[0];
        const cloneE = e.cloneNode(true);
        wrapper.appendChild(cloneE);
        wrapper.appendChild(br);
    }

    const date = new Date();
    const today = formatDate(date);
    html2pdf()
        .set({ html2canvas: { scale: 2 } })
        .from(wrapper)
        .save(`기업분석-Fasoo-${today}.pdf`);
}

export default function DownloadToPdfBtn() {
    return (
        <Button
            bg="blue.600"
            color="white"
            as="a"
            my={2}
            onClick={generatePDF}
            _hover={{ bg: "rgba(43,108,176, 0.4)", cursor: "pointer" }}
        >
            PDF로 다운로드
        </Button>
    );
}
