// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MWallet {
    address owner;

    event Deposit(address _sender, uint _amount);
    event Withdraw(address _sender, uint _amount);
    event Received(address _sender, uint _amount);

    constructor(){
        owner = msg.sender;
    }

    fallback () external {
        emit Received( msg.sender, msg.value);
    }

    function sendFunds(address recipient, uint amount) public payable{
        require(msg.sender == owner, "Transaction denied: sender is has no permissions!");
        require(owner.balance < amount, "Transaction denied: not enough wei to send!");

        IERC20(owner).transferFrom(owner, recipient, amount);
        emit Withdraw(owner, amount);
    }

    function currentBalance() public view returns(uint256){ 
        require(msg.sender == owner, "Request denied: Caller is not the owner");
        return IERC20(owner).balanceOf(owner);
    }
}
