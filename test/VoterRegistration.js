const VoterRegistration = artifacts.require('VoterRegistration.sol');

contract("VoterRegistration", async (accounts) => {

  it("can check whether or not a votar is registered", async () => {
    voterRegistraion = await VoterRegistration.deployed();
    let unregisteredVoter = accounts[0];
    var isRegisterd = await voterRegistraion.isRegisterd.call(unregisteredVoter);

    assert.equal(isRegisterd, false, "Voter should not be registered.");

    let registeredVoter = accounts[1];
    await voterRegistraion.register(registeredVoter);
    var isRegisterd = await voterRegistraion.isRegisterd.call(registeredVoter);

    assert.equal(isRegisterd, true, "Voter should be registered.");

  })

})
