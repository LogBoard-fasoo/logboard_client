import React, { useState } from "react";
import CustomRadioGroup from "../common/RadioGroup";

export default function MessageTypeRadioGroup({ option1, option2 }) {
    const [filter, setFilter] = useState("1");

    const radioLst = [
        { value: "1", option: option1 },
        { value: "2", option: option2 },
    ];

    const prop = {
        radioLst,
        changeFn: setFilter,
        value: filter,
    };

    return <CustomRadioGroup {...prop} />;
}
