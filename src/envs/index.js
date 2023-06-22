const getAppEnv = () => process.env.NODE_ENV;

export const getApiEndpoint = () => {
    switch (getAppEnv()) {
        case "production":
            return "https://web3.fasoo.com/logboard/";
        case "development":
            return "https://localhost:44302/";
        default:
            return "https://localhost:44302/";
    }
};
