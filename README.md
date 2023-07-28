# opbnb-bridge-tokens

## Prerequisite

Adding the BEP 20 tokens to the opBNB bridge requires your tokens to be verified on both BSC and opBNB. Follow the steps as below. 

1. Deploy your token`s smart contract to the BSC(Testnet/Mainnet).
2. Verify your smart contract with [BSCScan](https://bscscan.com/) or [BSCTrace](https://bsctrace.com/) explorer.
3. Deploy your L2 contract to the opBNB.
4. Verify your L2 contract with [opBNBScan](https://opbnbscan.com/) or [BSCScan](https://opbnb-testnet.bscscan.com/)(opBNB).

## How to deploy a L2 BEP-20 token 

To ensure compatibility with the BSC network, the L2 BEP 20 token must adhere to one of two interfaces, which are either the legacy [IL2StandardERC20](https://github.com/ethereum-optimism/optimism/blob/8b392e9b613ea4ca0270c2dca24d3485b7454954/packages/contracts/contracts/standards/IL2StandardERC20.sol) interface (only if the bridged layer is L2) or the new [IOptimismMintableERC20](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/contracts/universal/IOptimismMintableERC20.sol) interface. Both interfaces are available in the @eth-optimism/contracts package, along with a reference implementation of the L2StandardERC20 contract that is based on the OpenZeppelin ERC20 contract.

For example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

import { L2StandardERC20 } from "@eth-optimism/contracts/standards/L2StandardERC20.sol";

contract L2CustomBEP20 is L2StandardERC20 {
constructor(
address _l2Bridge,
address _l1Token
)


L2StandardERC20(_l2Bridge, _l1Token, "USDC on testnet", "USDC")
{
}

function decimals() public pure override returns (uint8) {
   return 18;
}

}

```

Please make sure your decimal setting of the L2 contract is the same as the L1 contract decimal settings. 

**Warning:** The standard bridge does *not* support certain ERC-20 configurations:

- [Fee on transfer tokens](https://github.com/d-xo/weird-erc20#fee-on-transfer)
- [Tokens that modify balances without emitting a Transfer event](https://github.com/d-xo/weird-erc20#balance-modifications-outside-of-transfers-rebasingairdrops)

## Update the bridge token list

You need to create a PR to the [repo](https://github.com/bnb-chain/opbnb-bridge-tokens.git) to add your token into the list of our bridged token list, and at the same time upload your token icon to the git repository.

First, append your token information to the list. 

| Name        | Symbol | Decimal | L1 address(Verified)                       | L2 address(Verfied)                        |
| ----------- | ------ | ------- | ------------------------------------------ | ------------------------------------------ |
| Binance USD | BUSD   | 18      | 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee | 0xa9aD1484D9Bfb27adbc2bf50A6E495777CC8cFf2 |
| BTCB        | BTCB   | 18      | 0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8 | 0x3AB4E696E31173409dbfBb1FEB5b9A7cC55A212c |
| ETH         | ETH    | 18      | 0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378 | 0x584f7b986d9942B0859a1E6921efA5342A673d04 |
| USDT Token  | USDT   | 18      | 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd | 0xCF712f20c85421d00EAa1B6F6545AaEEb4492B75 |
| USDC Token  | USDC   | 18      | 0x64544969ed7EBf5f083679233325356EbE738930 | 0x845E27B8A4ad1Fe3dc0b41b900dC8C1Bb45141C3 |
| DAI Token   | DAI    | 18      | 0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867 | 0xf46896fbEf6478eaCcFB1C815915daa7e6f87b22 |
| TestBEP20 Token   | tBEP20 | 18   | 0x8130346999ce53F291C426e4E075949aE24549f6 | 0x2C58b64b4BA448A9b60e9398E58d17F1824da962 |
| Your Token  | YTK    | 18      | Your L1 Address on BSC                     | Your L2 Address on opBNB                   |

Then, create a folder with your token symbol and upload your token icon file. The icon file should be a 48x48 png file with a size no larger than 300kb.

```shell
mkdir YOUR_TOKEN_SYMBOL
```
