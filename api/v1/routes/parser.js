const fs = require('fs');
const path = require('path');
const glob = require('glob');
const childProcess = require('child_process');

function parseGlob(globPattern) {
  const files = glob.sync(globPattern);
  return files;
}

function parseFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent;
}

function parseChildProcess(command) {
  try {
    const result = childProcess.execSync(command, { encoding: 'utf8' });
    return result;
  } catch (error) {
    console.error(`Error executing command: ${error}`);
  }
}

function parseJson(filePath) {
  const fileContent = parseFile(filePath);
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
  }
}

function parseYaml(filePath) {
  const fileContent = parseFile(filePath);
  try {
    const yaml = require('js-yaml');
    return yaml.safeLoad(fileContent);
  } catch (error) {
    console.error(`Error parsing YAML: ${error}`);
  }
}

module.exports = {
  parseGlob,
  parseFile,
  parseChildProcess,
  parseJson,
  parseYaml,
};