// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract MWallet {
    address owner;

    event Deposit(address _sender, uint _amount);
    event Withdraw(address _sender, uint _amount);
    event Received(address _sender, uint _amount);
    event Test(string message);

    constructor(){
        owner = msg.sender;
        emit Test("created joo");

    }

    fallback () external payable{
        emit Test("received");
        emit Received( msg.sender, msg.value);

    }

    function sendFunds(address recipient, uint amount) public payable{
        require(msg.sender == owner, "Transaction denied: sender is has no permissions!");
        require(owner.balance < amount, "Transaction denied: not enough wei to send!");

        emit Withdraw(owner, amount);
    }

    function send() public payable {}

    function currentBalance() public view returns(address, uint256){ 
        require(msg.sender == owner, "Request denied: Caller is not the owner");
        return (owner, address(this).balance);
    }
}
