import React from "react";
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    Heading,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { FiActivity, FiMessageCircle, FiMenu } from "react-icons/fi";

const LinkItems = [
    { name: "Data Analysis", icon: FiActivity, to: "/data-analysis" },
    { name: "Mapping", icon: FiMessageCircle, to: "/mapping" },
];

export default function Sidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

            <Box ml={{ base: 0, md: 60 }} borderRadius="xl" p="4" h="100vh">
                {children}
            </Box>
        </Box>
    );
}

function SidebarContent({ onClose, ...rest }) {
    return (
        <Box
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Heading as="h2" fontSize="3xl" fontWeight="bold">
                    Fasoo
                </Heading>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} to={link.to}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
}

function NavItem({ icon, to, children, ...rest }) {
    const location = useLocation();

    return (
        <NavLink to={to} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                mb="1"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "rgba(43,108,176, 0.4)",
                    color: "white",
                }}
                bg={location.pathname === to ? "blue.600" : "none"}
                color={location.pathname === to ? "white" : "none"}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
}

function MobileNav({ onOpen, ...rest }) {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

            <Heading as="h2" fontSize="2xl" ml="8" fontWeight="bold">
                Fasoo
            </Heading>
        </Flex>
    );
}
