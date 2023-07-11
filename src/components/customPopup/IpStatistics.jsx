import React from "react";
import { Card, CardBody, CardHeader, Heading, Td, Text, Tr, Wrap } from "@chakra-ui/react";
import SmoothTransition from "../../styles/animate/SmoothTransition";

const cnames = [
    {
        cname: "CJ",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "SK",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "Fasoo",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "LG",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
];

export default function IpStatistics({ ip }) {
    return (
        <Tr>
            <Td colSpan="8">
                <SmoothTransition>
                    <small>의심 매칭 기업</small>
                    <Wrap>
                        <Card variant="elevated">
                            <CardHeader>
                                <Heading size="md">{ip}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>도메인: hola</Text>
                                <Text>직원규모: hola</Text>
                            </CardBody>
                        </Card>
                    </Wrap>
                </SmoothTransition>
            </Td>
        </Tr>
    );
}
