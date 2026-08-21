const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../artifacts/juice-box-studios/dist/public");
const targets = [
  path.resolve(__dirname, "../public"),
  path.resolve(__dirname, "../dist"),
];

if (fs.existsSync(src)) {
  for (const target of targets) {
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(src, target, { recursive: true });
  }
  console.log("Successfully populated public/ and dist/ output directories.");
} else {
  console.error("Source build directory not found:", src);
  process.exit(1);
}
