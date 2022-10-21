const core = require("@actions/core");
let fs = require("fs");

const file = core.getInput("FileName");
const params = core.getInput("ParamsEnv");

const main = () => {
  const paramsContent = generateParametersArray(params);
  writeFile(file, paramsContent);
};

const generateParametersArray = (paramsStr) => {
  const paramLines = paramsStr.split(/\r?\n/);
  const paramsObject = paramLines
    .filter((line) => line.includes("="))
    .map((line) => {
      let [name, value] = line
        .split("=")
        .map((s) => s.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, ""));
      const pair = {
        ParameterKey: name,
        ParameterValue: value,
      };
      return pair;
    }, []);
  return Json.stringify(paramsObject);
};

const writeFile = (filename, strContent) => {
  fs.writeFile(filename, strContent, function (err) {
    if (err) throw err;
    console.log("File created successfully");
  });
};

main();
