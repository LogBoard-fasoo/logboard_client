import { atom } from "recoil";

const ipsFetched = [
    {
        ip: "168.92.10.201",
        cname: "Pana",
        hasMessage: false,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.40.202",
        cname: "Fasoo",
        hasMessage: false,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.10.203",
        cname: "Sparrow",
        hasMessage: true,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.20.204",
        cname: "SK",
        hasMessage: true,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.205",
        cname: null,
        hasMessage: false,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.206",
        cname: "CJ",
        hasMessage: true,
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.207",
        cname: null,
        hasMessage: false,
        messageType: 1,
        apply: false,
    },
];

const initialState = ipsFetched;

export const initialPopupIpState = atom({
    key: "initialPopupIpState",
    default: initialState,
});
