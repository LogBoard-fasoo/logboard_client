import React, { useState } from "react";
import CustomRadioGroup from "../common/RadioGroup";

export default function MessageTypeRadioGroup({ isDisabled }) {
    const [filter, setFilter] = useState("1");

    const radioLst = [
        { value: "1", option: "개인" },
        { value: "2", option: "기업" },
    ];

    const prop = {
        radioLst,
        changeFn: setFilter,
        value: filter,
        isDisabled,
    };

    return <CustomRadioGroup {...prop} />;
}
