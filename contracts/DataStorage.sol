// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;
import "hardhat/console.sol";

contract DataStorage {
    constructor() {}

    struct GenomeData {
        string encryptedData;
        address[] permittedAddresses;
        string typeOfData;
        uint16 price;
        address userAddress;
    }

    mapping(address => GenomeData) public genomeData;
    address[] private users;

    function updateData(GenomeData memory data) external payable {
        GenomeData storage temp = genomeData[msg.sender];
        temp.encryptedData = data.encryptedData;
        temp.typeOfData = data.typeOfData;
        temp.price = data.price;
        temp.userAddress = msg.sender;
    }

    function uploadData(
        string calldata encryptedData,
        string calldata typeOfData,
        uint16 price
    ) external {
        GenomeData memory temp = GenomeData(
            encryptedData,
            new address[](0),
            typeOfData,
            price,
            msg.sender
        );
        genomeData[msg.sender] = temp;
        users.push(msg.sender);
        console.log(temp.price);
    }

    function buy(address userAddress) public payable {
        require(
            msg.value >= genomeData[userAddress].price,
            "Not enough funds to purchase"
        );
        genomeData[userAddress].permittedAddresses.push(msg.sender);
        payable(userAddress).transfer(msg.value);
    }

    function retractData() external {
        delete (genomeData[msg.sender]);
    }

    function getData() external view returns (GenomeData[] memory) {
        GenomeData[] memory ret = new GenomeData[](users.length);
        for (uint16 i = 0; i < users.length; i++) {
            ret[i] = genomeData[users[i]];
        }
        return ret;
    }
}
