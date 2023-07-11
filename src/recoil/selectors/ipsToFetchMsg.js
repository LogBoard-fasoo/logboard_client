import { selector } from "recoil";
import { initialPopupIpState } from "../atoms/popupIpSetting";

const filteredIPsSelector = selector({
    key: "filteredIPs",
    get: ({ get }) => {
        const ipList = get(initialPopupIpState);
        return ipList.filter((item) => item.apply);
    },
});

export default filteredIPsSelector;
