import * as fs from "fs";
import { listDirectoriesInDirectory, validateToken } from "./utils";

async function main() {
  const result = {
    name: "opBNB Token List",
    timestamp: new Date().toISOString(),
    tokens: Array<any>(),
  };
  const dirs = await listDirectoriesInDirectory("./data");
  console.log(dirs);
  for (const dir of dirs) {
    console.log(`Validating ${dir}`);
    const path = `data/${dir}/data.json`;
    if (!fs.existsSync(path)) {
      throw new Error(`data.json not exist`);
    }
    const jsonString = fs.readFileSync(path, "utf8");
    const token = JSON.parse(jsonString);
    console.log(token);
    const generateToken: any = {
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      l1Address: token.l1Address,
      l2Address: token.l2Address,
      logoURI: `https://raw.githubusercontent.com/bnb-chain/opbnb-bridge-tokens/main/data/${token.symbol}/${token.logoURI}`,
    };
    if (token.extensions) {
      generateToken.extensions = token.extensions;
    }
    result.tokens.push(generateToken);
  }
  fs.writeFileSync("opbnb.tokenlist.json", JSON.stringify(result, null, 4));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
