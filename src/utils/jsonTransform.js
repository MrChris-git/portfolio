const fs = require("fs");
const path = require("path");
const vm = require("vm");

function extractArrayExpression(tsSource, exportConstName) {
  const anchor = `export const ${exportConstName}`;
  const anchorIndex = tsSource.indexOf(anchor);
  if (anchorIndex === -1) {
    throw new Error(`Could not find export '${exportConstName}' in source.`);
  }

  // Find the '=' of the export initializer, then the '[' of the array literal after it
  const equalsIndex = tsSource.indexOf("=", anchorIndex);
  if (equalsIndex === -1) {
    throw new Error("Could not find '=' after export declaration.");
  }

  const bracketStart = tsSource.indexOf("[", equalsIndex);
  if (bracketStart === -1) {
    throw new Error("Could not find '[' after export declaration.");
  }

  let depth = 0;
  let endIndex = -1;
  for (let i = bracketStart; i < tsSource.length; i += 1) {
    const ch = tsSource[i];
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) {
    throw new Error(
      "Could not find matching closing ']' for array expression."
    );
  }

  return tsSource.slice(bracketStart, endIndex + 1);
}

function evaluateArray(jsArrayExpression) {
  const context = {};
  vm.createContext(context);
  const expression = `(${jsArrayExpression})`;
  return vm.runInContext(expression, context);
}

function jsonTransform() {
  const sourcePath = path.join(__dirname, "..", "data", "projects.ts");
  const outputPath = path.join(
    process.cwd(),
    "public",
    "asset",
    "json",
    "projects.json"
  );

  const tsSource = fs.readFileSync(sourcePath, "utf8");
  const arrayExpression = extractArrayExpression(tsSource, "projects");
  const data = evaluateArray(arrayExpression);

  const json = JSON.stringify(data, null, 2);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, json + "\n", "utf8");
  console.log(
    `Wrote ${data.length} projects to ${path.relative(
      process.cwd(),
      outputPath
    )}`
  );
}

if (require.main === module) {
  jsonTransform();
}

module.exports = { jsonTransform };
