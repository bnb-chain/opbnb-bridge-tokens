import * as tokens from '../opbnb.tokenlist.json';
import { ethers } from 'ethers';

const OPBNB_ENDPOINT = 'https://opbnb-mainnet-rpc.bnbchain.org'
const BSC_ENDPOINT = 'https://bsc.nodereal.io'
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]


async function main() {
  const opbnbProvider = new ethers.JsonRpcProvider(OPBNB_ENDPOINT);
  const bscProvider = new ethers.JsonRpcProvider(BSC_ENDPOINT);

  for(const token of tokens.tokens) {
    console.log(token)
    const opbnbContract = new ethers.Contract(token.l2Address, ERC20_ABI, opbnbProvider);
    const bscContract = new ethers.Contract(token.l1Address, ERC20_ABI, bscProvider);
    const nameL2 = await opbnbContract.name();
    const symbolL2 = await opbnbContract.symbol();
    const decimalsL2 = (await opbnbContract.decimals()).toString();
    const nameL1 = await bscContract.name();
    const symbolL1 = await bscContract.symbol();
    const decimalsL1 = (await bscContract.decimals()).toString();
    if (token.name !== nameL2 || token.name !== nameL1) {
      throw new Error(`Name mismatch: ${token.name}, L2 name: ${nameL2}, L1 name: ${nameL1}`)
    }
    if (token.symbol !== symbolL2 || token.symbol !== symbolL1) {
      throw new Error(`Symbol mismatch: ${token.symbol}, L2 symbol: ${symbolL2}, L1 symbol: ${symbolL1}`)
    }
    if (token.decimals !== decimalsL2 || token.decimals !== decimalsL1) {
      throw new Error(`Decimals mismatch: ${token.decimals}, L2 decimals: ${decimalsL2}, L1 decimals: ${decimalsL1}`)
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
