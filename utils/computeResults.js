const fs = require('fs');
const path = require('path');

const resultsFilePath = path.join(__dirname, '../db/results.json');

let quizzResults = [];

const readResultsFile = () => {
    const data = fs.readFileSync(resultsFilePath);
    return JSON.parse(data);
}

const saveResult = (result, username) => {
    quizzResults = readResultsFile();
    quizzResults.push({...result, username});
    const jsonData = JSON.stringify(quizzResults);
    fs.writeFileSync(resultsFilePath, jsonData);
};

const getResults = (username) => {
    if(fs.existsSync(resultsFilePath)){
        const results = readResultsFile();
        return results.filter((result) => result.username === username)
    }
    return [];
}

module.exports = {
    saveResult,
    getResults
}