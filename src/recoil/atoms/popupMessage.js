import { atom } from "recoil";

const initialState = {
    ips: [],
    message: "",
    validDate: "",
};

export const initialPopupMessageState = atom({
    key: "initialPopupMessageState",
    default: initialState,
});
