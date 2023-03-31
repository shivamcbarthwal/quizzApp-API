const fs = require('fs');

const readJsonFromFile = (filePath) => {
  try{
    if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return null;
  } catch (err){
    return null;
  }
};

module.exports = {
  readJsonFromFile,
};
