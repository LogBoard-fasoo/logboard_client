const getAppEnv = () => process.env.NODE_ENV;

export const getApiEndpoint = () => {
    switch (getAppEnv()) {
        case "production":
            return "https://web3.fasoo.com/logboard/"; // TODO: 배포 URL 수정
        case "development":
            return "https://localhost:44302/";
        default:
            return "https://localhost:44302/";
    }
};
