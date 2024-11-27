// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

interface IPythMock {
    function getLatestPrice() external view returns (uint256);
    function getLatestTimestamp() external view returns (uint256);
}

contract PythMock is IPythMock {
    PythStructs.Price internal _price;
    uint256 internal _publishTime;

    constructor(PythStructs.Price memory price, uint256 publishTime) {
        _price = price;
        _publishTime = publishTime;
    }

    /**
     * @notice Get the latest price
     * @return price The latest price with 18 decimals
     */
    function getLatestPrice() external view override returns (uint256) {
        // Get price from Pyth
        PythStructs.Price memory priceData = _price;

        // Convert price to 18 decimals (Pyth uses 8 decimals by default)
        // price * 10^10 to convert from 8 to 18 decimals
        return uint256(uint64(priceData.price) * 10 ** 10);
    }

    /**
     * @notice Get the latest timestamp
     * @return timestamp The latest timestamp
     */
    function getLatestTimestamp() external view override returns (uint256) {
        return _publishTime;
    }

    function setPrice(PythStructs.Price memory price, uint256 publishTime) public {
        _price = price;
        _publishTime = publishTime;
    }
}
