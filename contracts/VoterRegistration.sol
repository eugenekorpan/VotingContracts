pragma solidity ^0.4.23;

contract VoterRegistration {

  mapping(address => bool) registered;

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function isRegisterd(address voter) view public returns (bool) {
    return registered[voter];
  }

  function register(address voter) public onlyOwner {
    registered[voter] = true;
  }
}
