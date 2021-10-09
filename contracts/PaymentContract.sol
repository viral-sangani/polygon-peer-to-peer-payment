// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PaymentContract {
    uint256 public totalFunds = 0;
    address public maticTokenAddress;

    constructor(address _maticTokenAddress) {
        maticTokenAddress = _maticTokenAddress;
    }

    function sendTokenToAddress(address to, uint256 amount) public {
        require(IERC20(maticTokenAddress).allowance(msg.sender, to) >= amount);
        IERC20(maticTokenAddress).transferFrom(msg.sender, to, amount);
    }

    function getBalance(address user) public view returns (uint256) {
        uint256 balance = IERC20(maticTokenAddress).balanceOf(user);
        return balance;
    }
}
