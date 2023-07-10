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
        </RadioGroup>
    );
}
