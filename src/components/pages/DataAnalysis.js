import Sidebar from "../layout/Sidebar";
import { Box, Icon, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { FiHash } from "react-icons/fi";
import CustomTooltip from "../common/Tooltip";
import CustomDateRangePicker from "../common/Datepicker";

export default function DataAnalysis() {
  const containerProps = [
    {title: '산업 분석', tooltipContent: '산업분석임다', children: "컨텐츠"},
    {title: '개별 산업 분석', tooltipContent: '산업분석임다', children: "컨텐츠"},
    {title: '상위 관심 기업', tooltipContent: '산업분석임다', children: "컨텐츠"},
    {title: '개별 기업 분석', tooltipContent: '산업분석임다', children: "컨텐츠"},
    {title: '개별 제품 분석', tooltipContent: '산업분석임다', children: "컨텐츠"},
  ]
  return (<Sidebar>
    <Box h="100%" p="10">
      <Heading as='h1' size='2xl' noOfLines={1}>
      Data Analysis
      </Heading>
      <CustomDateRangePicker/>
      <Stack>
        {containerProps.map(({children, ...rest}) => 
        <Container {...rest} titleIcon={FiHash}>children</Container>
          )}
      </Stack>
    </Box>
    </Sidebar>);
}

function Container({title, titleIcon, children, tooltipContent}){
  return <Box bg="gray.50" borderRadius='xl'p={6}>
    <Heading as='h2' size='lg' >
      <Icon
        boxSize={5}
        mr={2}
        _groupHover={{
          color: "white",
        }}
        as={titleIcon}
      />
      {title}
      <CustomTooltip tooltipContent={tooltipContent}/>
       </Heading>
      {children}
    </Box>
}

