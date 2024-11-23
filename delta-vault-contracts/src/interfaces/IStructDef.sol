// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IStructDef {
    enum DeltaVaultResultStatus {
        Invalid,
        NotEnd,
        NorInOrOut,
        InAndOut,
        OnlyOut,
        OnlyIn
    }

    struct ProductInfo {
        bytes32 targetTokenPythId;
        uint256 targetInitPrice;
        uint256 targetKnockInPrice;
        uint256 targetKnockOutPrice;
        uint256 startTime;
        uint256 period;
        uint256 baseProfit;
    }

    struct ProductResult {
        DeltaVaultResultStatus status;
        bool KnockIn;
        bool KnockOut;
        uint32 validPeriod;
        uint200 endPrice;
    }

    struct ProductInitArgs {
        address targetToken;
        bytes32 targetTokenPythId;
        uint256 targetInitPrice;
        uint256 targetKnockInPrice;
        uint256 targetKnockOutPrice;
        uint256 startTime;
        uint256 period;
        uint256 baseProfit;
        address usdToken;
        bytes32 usdPythId;
        address priceObserver;
        address pythAddress;
    }
}
