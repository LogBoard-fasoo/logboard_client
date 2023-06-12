import React, { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop > 0.2 * scrollHeight && scrollTop + windowHeight < scrollHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
            className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
            onClick={scrollToTop}
            style={{
                backgroundColor: "#2B6CB0",
                opacity: "40%",
                color: "white",
                borderRadius: "200px",
                padding: "15px",
                position: "fixed",
                right: "5vh",
                bottom: "5vh",
            }}
        >
            <FiChevronUp size={40} />
        </motion.button>
    );
}
