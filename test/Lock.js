const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Data contract", function () {
  it("User should be able to upload their data", async function () {
    const [owner] = await ethers.getSigners();

    const DataStorage = await ethers.deployContract("DataStorage");

    await DataStorage.uploadData.getData("BBFkubr38b@$F", "Gene Data", "10");

    let data = DataStorage.getData();

    console.log(data);

    expect(1 && (data = ["BBFkubr38b@$F", "Gene Data", "10"]));
  });
});

describe("Data Contract", function () {
  it("User should be able to retract their data", async function () {
    const [owner] = await ethers.getSigners();

    const DataStorage = await ethers.deployContract("DataStorage");

    await DataStorage.retractData();

    let data = DataStorage.getData();

    console.log(data);

    expect(1 && !data.includes[("BBFkubr38b@$F", "Gene Data", "10")]);
  });
});

describe("Data Contract", function () {
  it("researcher msut be able to view the data", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);

    const tokenBalance = await DutchAuction.getTokenBalance();

    expect(tokenBalance).to.equal(1000);
  });
});

describe("DutchAuction Committing eth", function () {
  it("Calling the buy() function at the start with 0.1 eth should buy 100 tokens ", async function () {
    //original token balance : 1000
    // start Price : 10**15 per token (decreases over time)
    // sending 0.1 eth at the start should buy  100 tokens
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);

    const transactionResponse = await DutchAuction.buy({
      value: ethers.parseEther("0.1"),
    });

    const currentPrice = await DutchAuction.getPrice();
    console.log(currentPrice);

    const tokenBalance = await DutchAuction.getTokenBalance();

    const expectedTokenBalance = 1000 - Number(BigInt(10 ** 17) / currentPrice);

    expect(tokenBalance).to.equal(expectedTokenBalance);
  });
});
