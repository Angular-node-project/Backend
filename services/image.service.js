const { APP_CONFIG } = require("../config/app.config");
const ImageKit = require("imagekit");
const {
  IMAGEKIT_ENDPOINT_URL,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY,
} = APP_CONFIG;

// register or make image kit instance
var imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_ENDPOINT_URL,
});

// upload
async function upload({ files }) {
  try {
    const fileIds = [];
    const imageurls=[];
      if (Array.isArray(files)) {
        const promises = files.map(async (file) => {
          console.log(file);
          return imagekit.upload({
            file: file.base64, // Base64 string
            fileName: file.fileName, // File name
          }).then((response) => {
            if (response && response.fileId) {
              fileIds.push(response.fileId);
              imageurls.push(response.url);
            }
          });
        });
  
        await Promise.all(promises);
        return { message: "success", fileIds, imageurls };
      
    } else {
      throw new Error("Upload failed due to invalid parameter!")
    }
  } catch (error) {
    console.log({
      info: "Erro while uploading file",
      error,
      message: error?.message,
    });
  }
}

module.exports.uploadService = {
  upload
};

