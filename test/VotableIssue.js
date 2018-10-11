const VotableIssue = artifacts.require('VotableIssue.sol');
const VoterRegistration = artifacts.require('VoterRegistration.sol');

contract("VotableIssue", async (accounts) => {

  before(async () => {
    voterRegistraion = await VoterRegistration.deployed();
  })

  it("gets created with a voting issue code", async () => {
    let issue = await VotableIssue.new('39R', voterRegistraion.address);
    let code = await issue.code.call();

    assert.equal(web3.toAscii(code), '39R', 'Issue code should be 39R');
  })

  it("allows registered voters to vote", async () => {
    let voter = accounts[6];
    await voterRegistraion.register(voter)

    let issue = await VotableIssue.new('39R', voterRegistraion.address);
    await issue.vote(true, { from: voter });

    let voteCast = await issue.voteFrom.call(voter);
    assert.equal(voteCast, true, "Voter should have voted 'true'");
  });


  it("does not allow unregistered voters to vote", async () => {
    let voter = accounts[9];
    let issue = await VotableIssue.new('39R', voterRegistraion.address);

    try {
      await issue.vote(true, { from: voter });
    } catch(err) {
    }

    let voteCast = await issue.voteFrom.call(voter);
    assert.equal(voteCast, false, "Voter should not have been allowed to vote");
  });

})
