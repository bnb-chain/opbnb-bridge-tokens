import * as fs from "fs";
import { listDirectoriesInDirectory, validateToken } from "./utils";

async function main() {
  let dirs = [];
  if (process.env.CHANGED_FILES === "all") {
    dirs = await listDirectoriesInDirectory("./data");
  } else {
    const changedFiles = process.env.CHANGED_FILES?.split(" ") || [];
    console.log(`Changed files: ${changedFiles}`);
    for (const changedFile of changedFiles) {
      const regex = /data\/(\w+)\/data\.json/; // Regex pattern matching the desired format
      const match = changedFile.match(regex); // Perform the match
      if (match && match[1]) {
        const symbol = match[1];
        dirs.push(symbol);
      }
    }
  }
  console.log(`dirs: ${dirs}`);
  for (const dir of dirs) {
    console.log(`Validating ${dir}`);
    const path = `data/${dir}/data.json`;
    if (!fs.existsSync(path)) {
      throw new Error(`data.json not exist`);
    }
    const jsonString = fs.readFileSync(path, "utf8");
    const token = JSON.parse(jsonString);
    console.log(token);
    await validateToken(token);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
