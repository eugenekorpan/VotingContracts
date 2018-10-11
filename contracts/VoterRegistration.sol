pragma solidity ^0.4.23;

contract VoterRegistration {

  mapping(address => bool) registered;

  function isRegisterd(address voter) view public returns (bool) {
    return registered[voter];
  }

  function register(address voter) public {
    registered[voter] = true;
  }
}
