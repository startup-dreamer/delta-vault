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
        address targetTokenFeeData;
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
        address targetTokenFeeData;
        uint256 targetInitPrice;
        uint256 targetKnockInPrice;
        uint256 targetKnockOutPrice;
        uint256 startTime;
        uint256 period;
        uint256 baseProfit;
        address usdToken;
        address usdFeeData;
        address priceObserver;
    }
}
