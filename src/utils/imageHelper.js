const path = require("path");
const XLSX = require('xlsx');
const fs = require("fs");
const BadRequestError = require("../errors/badRequest.error");
const { publicFolder } = require("../utils/constants");

// module.exports.uploadSingleFile = async (image,folderName) => {
//     try{
//         const fileExtension = path.extname(image.name).toLowerCase();
//         if (!allowedImageFile.includes(fileExtension)) {
//             return response(422, "Please Upload Either jpg or png Images",fileExtension);
//         }
//         let directoryPath = path.join(publicFolder, folderName);
//         if (!fs.existsSync(directoryPath)) {
//             fs.mkdirSync(directoryPath, { recursive: true });
//         }
//         const fileName = Date.now() + fileExtension;
//         const filePath =  path.join(folderName, fileName);
//         const storedFilePath = path.join(publicFolder, filePath);
//         await image.mv(storedFilePath);
//         return filePath;
//     }catch(e){
//         return response(422,"File Not Uploaded",e.message);
//     }
// }

module.exports.uploadSingleFile = async (singleImage, folderName) => {
    try {
        const directoryPath = path.join(publicFolder, folderName);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        // Generate filename
        const fileExtension = path.extname(singleImage.name).toLowerCase();
        const generateFileName = `${Date.now()}${fileExtension}`;
        const dbFilePath = path.join(folderName, generateFileName);
        const storeFilePath = path.join(publicFolder, dbFilePath);

        // Save file to the server
        await singleImage.mv(storeFilePath);

        // Return relative path to store in DB
        return dbFilePath;
    } catch (e) {
        throw e;
    }
};


module.exports.uploadMultipleFile = async (files, folderName) => {
  try {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new BadRequestError('No files provided');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const directoryPath = path.join(publicFolder, folderName);

    // Create folder if not exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const uploadedFiles = [];

    for (const file of files) {
      if (file.size > maxSize) {
        throw new BadRequestError(`${file.name} exceeds 5MB limit`);
      }

      // Get file extension and generate unique name
      const fileExtension = path.extname(file.name).toLowerCase();
      const generateFileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}${fileExtension}`;

      const dbFilePath = path.join(folderName, generateFileName);
      const storeFilePath = path.join(publicFolder, dbFilePath);

      // Save file
      await file.mv(storeFilePath);

      uploadedFiles.push(dbFilePath);
    }

    return uploadedFiles; // return list of all uploaded images

  } catch (error) {
    throw error;
  }
};


module.exports.uploadAndParseExcel = async (excelFile, uploadFolder = "excels") => {
    try {
        // Create folder if not exists
        const directoryPath = path.join(publicFolder, uploadFolder);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const fileExtension = path.extname(excelFile.name).toLowerCase();
        const fileName = `${Date.now()}${fileExtension}`;
        const absolutePath = path.join(directoryPath, fileName);

        await excelFile.mv(absolutePath);

        const workbook = XLSX.readFile(absolutePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // const tableData = data.map(item => ({
        //     majorHeading: item.majorHeading || "NA",
        //     activityCode: item.activityCode || "NA",
        //     metValue: item.metValue || "NA",
        //     activityDescription: item.activityDescription || "NA",
        // }));

        fs.unlinkSync(absolutePath);

        return data;

    } catch (error) {
        console.error("Excel Upload Error:", error);
        throw error;
    }
}
