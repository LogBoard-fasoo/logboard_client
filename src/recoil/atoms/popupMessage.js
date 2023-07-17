import { atom } from "recoil";

const initialState = {
    ips: [],
    content: "",
    validDate: "",
    url: "",
};

export const initialPopupMessageState = atom({
    key: "initialPopupMessageState",
    default: initialState,
});
