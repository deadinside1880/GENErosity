// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

contract DataStorage {
    constructor() {}

    struct GenomeData {
        bytes encryptedData;
        address[] permittedAddresses;
    }

    mapping(address => GenomeData) genomeData;
}
