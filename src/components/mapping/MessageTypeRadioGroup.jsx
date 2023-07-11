import React, { useEffect, useState } from "react";
import CustomRadioGroup from "../common/RadioGroup";

export default function MessageTypeRadioGroup({ optionLst, onChange, value }) {
    const radioLst = optionLst.map((option, idx) => ({ value: idx + 1, option: option }));

    const prop = {
        radioLst,
        onChange: onChange,
        value,
    };

    return <CustomRadioGroup {...prop} />;
}
