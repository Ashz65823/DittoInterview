import fs from "fs";
import path from "path";

const resultsDir = path.join(process.cwd(), "allure-results");

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

const env = `
Browser=Chromium
Browser.Version=Playwright
OS=Windows
Node.Version=${process.version}
Project=Ditto Insurance
Framework=Playwright + Cucumber
`;

fs.writeFileSync(path.join(resultsDir, "environment.properties"), env);

const executor = {
  name: "Local Machine",
  type: "npm",
  url: "",
  buildOrder: "1",
  buildName: "Playwright Automation",
  buildUrl: "",
  reportName: "Ditto Test Execution",
};

fs.writeFileSync(
  path.join(resultsDir, "executor.json"),
  JSON.stringify(executor, null, 2),
);

const historyDir = path.join(resultsDir, "history");
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir);
}

const categories = [
  {
    name: "Assertion Failures",
    matchedStatuses: ["failed"],
    messageRegex: ".*expect.*",
  },
  {
    name: "Timeout Errors",
    matchedStatuses: ["broken"],
    messageRegex: ".*timeout.*",
  },
  {
    name: "Element Not Found",
    matchedStatuses: ["broken"],
    messageRegex: ".*not found.*",
  },
];

fs.writeFileSync(
  path.join(resultsDir, "categories.json"),
  JSON.stringify(categories, null, 2),
);

console.log("✔ Allure system files created");
