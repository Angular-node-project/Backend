require("dotenv").config();
const { DATA_BASE } = require("./database/mongo/index");
const { APP_CONFIG } = require("./config/app.config");
const ecommerceApp = require("./index");

(async function () {
    // connecting to database
    await DATA_BASE.connectToMongoUsingURI(
        {
            uri: APP_CONFIG.MONGO_CLUSTER_URI
            ,
            callback: () => {
                console.log("App database has connected successfully");
                ecommerceApp.listen(APP_CONFIG.HTTP_PORT, "0.0.0.0", () => {
                    console.log(`App is up and running on port ${APP_CONFIG.HTTP_PORT}`);
                });
            },
        });
})();
