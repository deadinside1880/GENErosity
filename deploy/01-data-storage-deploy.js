const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const WFcoin = await deploy("DataStorage", {
    contract: "DataStorage",
    from: deployer,
    log: true,
  });

  log("-----------------------");
};

module.exports.tags = ["all", "datastorage"];
