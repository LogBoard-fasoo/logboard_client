import React from "react";
import { initialMappingState } from "../../recoil/atoms/ipMapping";
import { useRecoilState } from "recoil";
import CustomRadioGroup from "../common/RadioGroup";
import { Heading, RadioGroup } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

export default function IpCustomRadioGroup() {
    const [ipMappingState, setIpMappingState] = useRecoilState(initialMappingState);
    const { filterInterest, filterCompany, filterProduct, filterTrend, filterMessage } = ipMappingState;

    return (
        <RadioGroup>
            <Heading size="md">
                <FiCheckCircle />
                &nbsp;필터 기준
            </Heading>
            <CustomRadioGroup
                title="관심도"
                key={"관심도"}
                radioLst={[
                    { value: 1, option: "방문횟수" },
                    { value: 2, option: "High intent" },
                ]}
                changeFn={(e) => console.log(e)}
                defaultValue={filterInterest}
            />
            {/* <CustomRadioGroup
                title="매칭 기업 유무"
                radioLst={[
                    { value: 1, option: "있음" },
                    { value: 2, option: "없음" },
                ]}
                changeFn={(e) => setIpMappingState((d) => ({ ...d, filterInterest: e.target.value }))}
                defaultValue={filterInterest}
            /> */}
            {/* <CustomRadioGroup
                title="관심 제품"
                radioLst={[
                    { value: 1, option: "방문횟수" },
                    { value: 2, option: "High intent" },
                ]}
                changeFn={(e) => setIpMappingState((d) => ({ ...d, filterInterest: e.target.value }))}
                defaultValue={filterInterest}
            />
            <CustomRadioGroup
                title="방문 기록"
                radioLst={[
                    { value: 1, option: "방문횟수" },
                    { value: 2, option: "High intent" },
                ]}
                changeFn={(e) => setIpMappingState((d) => ({ ...d, filterInterest: e.target.value }))}
                defaultValue={filterInterest}
            /> */}
            {/* <CustomRadioGroup
                title="메시지"
                radioLst={[
                    { value: 1, option: "있음" },
                    { value: 2, option: "없음" },
                ]}
                changeFn={(e) => setIpMappingState((d) => ({ ...d, filterInterest: e.target.value }))}
                defaultValue={filterInterest}
            /> */}
        </RadioGroup>
    );
}
