# opbnb.tokenlist.json schema description

The schema description of the []`opbnb.tokenlist.json`](./opbnb.tokenlist.json) file.

## example

```json
{
    "name": "opBNB Token list",
    "timestamp": "2023-09-12T02:58:18.034Z",
    "tokens": [
        {
            "name": "BTCB Token",
            "symbol": "BTCB",
            "decimals": "18",
            "logoURI": "https://raw.githubusercontent.com/bnb-chain/opbnb-bridge-tokens/main/data/BTCB/logo.svg",
            "l1Address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
            "l2Address": "0x7c6b91d9be155a6db01f749217d76ff02a7227f2",
            "extensions": {
                "officialBridgeStatus": "deprived"
            }
        }
    ]
}
```

## description

public fields:
- `name`: The value is fixed to `opBNB Token list`
- `timestamp`: The timestamp when the file is updated.

## required fields for each token

- `name`: the name of the token. The token's name should match the `name` field in the token contract, as should the symbol and decimals.
- `symbol`: the symbol of the token
- `decimals`: the decimals of the token
- `logoURI`: the logo of the token, it should be a svg file, and the size should be 64x64
- `l1Address`: the contract address of the token on L1(BSC)
- `l2Address`: the contract address of the token on L2(opBNB)

### extensions(optional)

- `officialBridgeStatus`(optional): indicate the listing status on opBNB official bridge. If the field is missing, then it's a normal token, will be shown in both deposit and withdraw token list.
    - `depriving`: during the process of deprivation. The token will not appear in the deposit token list but will remain in the withdraw token list.
    - `deprived`: The token has already been removed from the official bridge. It will not appear in the token list.
