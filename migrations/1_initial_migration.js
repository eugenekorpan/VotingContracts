var Migrations = artifacts.require("./Migrations.sol");
var VoterRegistration = artifacts.require("./VoterRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VoterRegistration);
};
