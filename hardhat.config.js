require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require('./tasks/block-number');
require('hardhat-gas-reporter');

/** @type import('hardhat/config').HardhatUserConfig */

// дефолтний блокчейн мережа - хардхет

// yarn add --dev dotenv
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.8",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    localhost: { // ця нода відрізняється від дефолт hardhat
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      // accounts: 'вже готові самі'
    }
    // yarn hardhat run scripts/deploy.js --network sepolia
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  }
};
