const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../artifacts/juice-box-studios/dist/public");
const vercelOutputDir = path.resolve(__dirname, "../.vercel/output");
const vercelOutputStatic = path.resolve(vercelOutputDir, "static");
const vercelOutputConfig = path.resolve(vercelOutputDir, "config.json");

if (fs.existsSync(src)) {
  const targets = [
    path.resolve(__dirname, "../public"),
    path.resolve(__dirname, "../dist"),
    vercelOutputStatic,
  ];

  for (const target of targets) {
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(src, target, { recursive: true });
  }

  const vercelConfig = {
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index.html" }
    ]
  };
  fs.writeFileSync(vercelOutputConfig, JSON.stringify(vercelConfig, null, 2));

  console.log("Successfully generated .vercel/output (Build Output API v3) and public/dist directories.");
} else {
  console.error("Source build directory not found:", src);
  process.exit(1);
}
