require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider([PRIVATE_KEY], API_URL)
      },
      network_id: 42
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  compilers: {
    solc: {
      version: "0.8.0",
    }
  },
};
