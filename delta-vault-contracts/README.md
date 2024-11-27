# <h1 align="center"> Hardhat x Foundry Template </h1>

**Core Protocol contracts**

![Github Actions](https://github.com/devanonon/hardhat-foundry-template/workflows/test/badge.svg)

### Getting Started

 * Use Foundry: 
```bash
forge install
```

 * Use Hardhat:
```bash
npm install
```

### Features

 * Write / run tests with either Hardhat or Foundry:
```bash
forge test
# or
npx hardhat test
```

 * Use Hardhat's task framework
```bash
npx hardhat example
```

### Notes

Whenever you install new libraries using Foundry, make sure to update your `remappings.txt` file by running `forge remappings > remappings.txt`. This is required because we use `hardhat-preprocessor` and the `remappings.txt` file to allow Hardhat to resolve libraries you install with Foundry.

MockWBTC deployed to: 0xA64D3f740757F36A8f1b62D9E25984C66860a062
DeltaVaultProduct deployed to: 0xc275B3380d68591eAacBe6d4F5BEc2C6948Ab24E
PriceObserver deployed to: 0x2E14a400d789f82586ef6Ca1cAc5E3DfFFaD2066
HedgeExecutor deployed to: 0x29560FF840e096797B87a49122C501C1F694a75A
DeltaVaultFactory deployed to: 0xD9D90ce09B85AFC884C3b853dB365C5E226b23A2

sepolia
DeltaVaultProduct deployed to: 0x5879F64FA3Ee6B890498de35AEf7b4985468b327
HedgeExecutor deployed to: 0xEDd0473e541928336DD5e82A839FeDAFd6103287
PriceObserver deployed to: 0xaC6bEAedA40B7D9333e87b39F9Ac68B58B9c89d4
MockWBTC deployed to: 0x6d6a4678E7755c17ffe0E65211F80D4756d284b5
MockUSDe deployed to: 0x07ece4D758534FE8F8765c0f290b7a5d45dDDF30
DeltaVaultFactory deployed to: 0x198ba9B0fb1447d426d09D81C21057167865935d