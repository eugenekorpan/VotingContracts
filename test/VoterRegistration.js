const VoterRegistration = artifacts.require('VoterRegistration.sol');

contract("VoterRegistration", async (accounts) => {

  it("can check whether or not a votar is registered", async () => {
    voterRegistraion = await VoterRegistration.deployed();

    let unregisteredVoter = accounts[0];
    var isRegistered = await voterRegistraion.isRegistered.call(unregisteredVoter);

    assert.equal(isRegistered, false, "Voter should not be registered.");

    let registeredVoter = accounts[1];
    await voterRegistraion.register(registeredVoter);
    var isRegistered = await voterRegistraion.isRegistered.call(registeredVoter);

    assert.equal(isRegistered, true, "Voter should be registered.");
  });

  it("only lets the owner register new voters", async () => {
    voterRegistraion = await VoterRegistration.deployed();

    let voter = accounts[7];

    try {
      await voterRegistraion.register(voter, { from: accounts[4] });
    } catch(err) {
      var isRegistered = await voterRegistraion.isRegistered.call(voter);
      assert.equal(isRegistered, false, "Voter should not be registered.");
    }

    await voterRegistraion.register(voter, { from: accounts[0] });
    var isRegistered = await voterRegistraion.isRegistered.call(voter);
    assert.equal(isRegistered, true, "Voter should be registered.");
  });

})
