const path = require("path");

module.exports.imageKitPayloadBuilder = (expressUploadedFile) => {
  const originalExtension = path.extname(expressUploadedFile.name);
  const originalName = path.basename(
    expressUploadedFile.name,
    originalExtension
  );

  // Renaming the file in temp directory with the correct extension
  const newFileName = originalName + originalExtension;
  return {
    fileName: newFileName,
    src: expressUploadedFile?.data,
  };
};
