import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ScrollButton() {
    const [moveToTop, setMoveToTop] = useState(true);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    }

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop >= 0.4 * scrollHeight && scrollTop + windowHeight <= scrollHeight) {
            setMoveToTop(false);
        } else {
            setMoveToTop(true);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.button
            whileHover={{ scale: 1.1, opacity: "100%" }}
            whileTap={{ scale: 0.9 }}
            onClick={moveToTop ? scrollToBottom : scrollToTop}
            style={{
                backgroundColor: "#2B6CB0",
                opacity: "40%",
                color: "white",
                borderRadius: "200px",
                padding: "15px",
                position: "fixed",
                right: "5vh",
                bottom: "5vh",
                zIndex: 5,
            }}
        >
            {moveToTop ? <FiChevronDown size={40} /> : <FiChevronUp size={40} />}
        </motion.button>
    );
}
