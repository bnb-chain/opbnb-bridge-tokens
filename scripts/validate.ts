import * as tokens from "../opbnb.tokenlist.json";
import { ethers } from "ethers";
import { validateToken } from "./utils";

async function main() {
  for (const token of tokens.tokens) {
    console.log(`Validating ${token.symbol}`);
    console.log(token);
    await validateToken(token, { logoIsURL: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
