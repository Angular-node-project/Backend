const mongoose = require("mongoose");

const connectToMongoUsingURI = async ({uri, callback }) => {
  try {
    await mongoose.connect(uri);
    process.nextTick(() => {
      callback();
    });
  } catch (error) {
    console.log(uri);
    console.log(error?.message);
    throw new Error("Internal server error, can't connect to mongodb");
  }
};

const connectToMongo = async ({dpoptions, callback }) => {
  try {
    await mongoose.connect(dpoptions.url, {
      dbName: dpoptions.databaseName,
      auth: {
        username: dpoptions.username,
        password: dpoptions.password
      }
    });
    process.nextTick(() => {
      callback();
    });
  } catch (error) {
    console.log(error?.message);
    throw new Error("Internal server error, can't connect to mongodb");
  }
};

module.exports.DATA_BASE = {
  connectToMongo,
  connectToMongoUsingURI
};
