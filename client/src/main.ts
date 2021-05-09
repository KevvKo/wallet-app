// /**file to initialize the project and to register all webcomponents */

import './components/app-root';
import './components/app-header';
import './components/app-main';
import './components/app-footer';
import './components/account-info';
import './components/token-balance';
import Web3 from 'web3'
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");