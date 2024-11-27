// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WBTC is ERC20 {
    constructor() ERC20("Wrapped BTC", "WBTC") {
        // Optionally, you can add initialization logic here.
    }

    function mint(address user, uint256 amount) public {
        _mint(user, amount);
    }
}
