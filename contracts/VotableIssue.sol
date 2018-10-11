pragma solidity ^0.4.23;

import "./VoterRegistration.sol";

contract VotableIssue {

  bytes3 public code;
  mapping (address => bool) public votes;
  VoterRegistration public voterRegistraion;

  constructor(bytes3 _code, address _voterRegistrationAddress) public {
    code = _code;
    voterRegistraion = VoterRegistration(_voterRegistrationAddress);
  }

  function vote(bool _vote) public {
    require(voterRegistraion.isRegistered(msg.sender));
    votes[msg.sender]   = _vote;
  }

  function voteFrom(address _voter) public view returns (bool) {
    return votes[_voter];
  }
}
