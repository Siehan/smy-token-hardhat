//SPDX-License-Identifier: MIT

pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title SmyToken
/// @author Sylvie Mémain-Yé

contract SmyToken is ERC20 {
    constructor(uint256 totalSupply_) ERC20("SmyToken", "SMY") {
        _mint(msg.sender, totalSupply_ * 10**decimals());
        //_mint(msg.sender, 10000*10**18);
    }
}
