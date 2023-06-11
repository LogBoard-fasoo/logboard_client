import React, { useState } from "react";
import CustomRadioGroup from "../common/RadioGroup";

export default function MessageTypeRadioGroup() {
    const [filter, setFilter] = useState(1);

    const radioLst = [
        { value: 1, option: "개인" },
        { value: 2, option: "기업" },
    ];

    function changeFn(e) {
        setFilter((s) => ({ ...s, filter: parseInt(e) }));
    }

    const prop = {
        radioLst,
        changeFn,
        defaultValue: filter,
    };

    return <CustomRadioGroup {...prop} />;
}
