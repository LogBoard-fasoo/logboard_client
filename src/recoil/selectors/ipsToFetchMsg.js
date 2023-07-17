import { selector } from "recoil";
import { initialPopupIpState } from "../atoms/popupIpSetting";

const filteredIPsSelector = selector({
    key: "filteredIPs",
    get: ({ get }) => {
        const ipList = get(initialPopupIpState);
        return ipList ? ipList.filter((item) => item.apply) : [];
    },
});

export default filteredIPsSelector;
