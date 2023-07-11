import { atom } from "recoil";

const initialState = {
    ips: [],
    content: "",
    validDate: "",
};

export const initialPopupMessageState = atom({
    key: "initialPopupMessageState",
    default: initialState,
});
