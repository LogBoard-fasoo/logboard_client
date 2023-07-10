import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { CustomDatePicker } from "../common/Datepicker";

export default function MessageBox() {
    const [value, setValue] = React.useState("");
    const handleChange = (event) => setValue(event.target.value);

    return (
        <Box>
            <Heading size="sm" noOfLines={1} pb={3}>
                Message Box
            </Heading>
            <FormControl>
                <FormLabel>컨텐츠</FormLabel>
                <Textarea type="text" placeholder="팝업 메시지 컨텐츠" rows={2} />
                <FormLabel>제품명</FormLabel>
                <Input type="text" placeholder="추천할 제품명" />
                <FormLabel>제품 URL</FormLabel>
                <Input type="text" placeholder="추천할 제품 url" />
                <FormLabel>유효일자</FormLabel>
                <CustomDatePicker />
                <Flex>
                    <Spacer />
                    <Button colorScheme="blue" type="submit">
                        저장
                    </Button>
                </Flex>
            </FormControl>
        </Box>
    );
}
