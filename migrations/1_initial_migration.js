var Migrations = artifacts.require("Migrations");
var Gnft = artifacts.require("Gnft");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Gnft);
};
