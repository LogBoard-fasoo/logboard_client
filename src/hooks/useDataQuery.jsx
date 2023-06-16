import { useQuery } from "@chakra-ui/react";

export default function useDataQuery(query) {
    const { isLoading, isSuccess, data, error } = useQuery(query);

    let result;
    if (isLoading) {
        result = <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
    } else if (isSuccess) {
        result = (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>데이터를 불러오던 중 에러가 발생했습니다.</AlertTitle>
                <AlertDescription>새로고침 또는 개발자에게 문의주세요.</AlertDescription>
            </Alert>
        );
    } else {
        //   result = /* 에러 시 반환할 값 */;
    }

    return { result, isLoading, isSuccess, data, error };
}
