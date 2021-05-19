// @ts-nocheck

import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import transactionMembers from './interfaces//transaction-members'
import BigNumber from 'bignumber.js';
import Web3 from 'web3'
import contract from '../../../build/contracts/MWallet.json';

declare let window: any; 
declare let web3: Web3;
@customElement('transaction-section')
export class TransactionSection extends LitElement {
    
    @property()
    transactionKind: string;

    @state()
    private _mwalletAddress = '0xDE703c365b6fec50B09a9f915F7CDf0Ac4A86869'
    @state()
    ether = 0;
    @state()
    gasPrice = 3;
    @state()
    gasLimit = 21000;
    @state()
    invalid = false;
    @state()
    title: string;

    static styles = css`
    :host{
        width: 80%;
        padding: var(--spacer) 0;
    }
    div{
        display: flex;
        align-items: center;
        margin: var(--spacer) 0;
    }
    label{
        font-weight: bold; 
        margin-right: var(--spacer);
    }
    input{
        margin-right: 15px;
        width: 150px;
    }
    button{
        margin-left: auto;
        background-color: var(--primary-color);
        color: var(--font-color-light);
        border: none;
        border-radius: var(--border-radius);
        padding: var(--spacer);
    }
    button:hover{
        cursor: pointer;
        filter: brightness(80%);
    }
    .error-validation{
        text-align: center;
        color: var(--danger-color);
    }
    `;

    connectedCallback(){
        super.connectedCallback();   
        this._initializeTransactionKind();
        web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    }
    render() {
        return html`
        <h2>${this.title}</h2>
        <div>
            <label>Ether:</label>
            <input 
                type="text" 
                placeholder="amount..."
                value="${this.ether}"
                @change="${(e) => {this.ether = e.target.value}}"
            >
            <label>Transaction Fee:</label>
            <input 
                type="number" 
                placeholder="gas price" 
                value="${this.gasPrice}" 
                @change="${(e) => {this.gasPrice = e.target.value}}"
            >
            <input 
                type="number" 
                placeholder="gas limit" 
                value="${this.gasLimit}" 
                @change="${(e) => {this.gasLimit = e.target.value}}"
            >
            <button @click="${this._transaction}">${this.transactionKind}</button>
        </div>
        ${ this.invalid 
            ?  html`<div class="error-validation">Please enter a valid address</div>`
            : html``
        }`;
    }

    integerToWei(ether: number){
        return new BigNumber(ether * 10**18).toNumber();
    }

    integerToGWei(ether: number){
        return new BigNumber(ether * 10**9).toNumber();
    }

    toHex(integer: number){
        return integer.toString(16);
    }

    getQuantity(value: number){
        return '0x' + this.toHex(value);
    }

    private async _transaction(){

        if(!this._mwalletAddress) {
            this.invalid = true;
            return
        }

        const value    = this.getQuantity(this.integerToWei(this.ether));
        const gasPrice = this.getQuantity(this.integerToGWei(this.gasPrice));
        const gasLimit = this.getQuantity(this.gasLimit);
        let transactionMembers: transactionMembers;

        this.transactionKind === 'withdraw'
        ? transactionMembers = {
            recipient: window.ethereum.selectedAddress,
            sender: this._mwalletAddress
        }
        :   
        transactionMembers = {
            recipient: this._mwalletAddress,
            sender: window.ethereum.selectedAddress
        }
        
        const params = [{
            "from": transactionMembers.sender,
            "to": transactionMembers.recipient,
            "gas": gasLimit, 
            "gasPrice": gasPrice, 
            "value": value 
        }]      

        if(this.transactionKind === 'withdraw'){
            const abi = contract.abi
            const mwallet = new web3.eth.Contract(abi, this._mwalletAddress);
            console.log(await mwallet.methods.send("0x3868E57fbd4a5EF4459Bd2045028748F88641474", 1).estimateGas())
            // const tx = {
            //     "chainId": 42,
            //     'from': transactionMembers.sender,
            //     'to': transactionMembers.recipient,
            //     'gas': 23070,
            //     'data': mwallet.methods.send("0x3868E57fbd4a5EF4459Bd2045028748F88641474", 1).encodeABI()
            // }
            // const singPromise = web3.eth.accounts.signTransaction(tx, "01ef0549fba112012158a69e4317175ec56ecab4b4e8b435847e3680554232ee").then((signedTx) => {

            //     web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash){
            //         if(!error) { console.log(`Transaction-Hash ${hash}`) }
            //         else {console.log(`Something went wrong to submit the transaction: ${error}`) }
            //     })  
            // })

            return
        }

        // window.ethereum.request({
        //     method: 'eth_sendTransaction',
        //     params
        // })
    }

    private _initializeTransactionKind(){
        this.transactionKind === "withdraw"
        ? this.title = "Deposit"
        : this.title = "Withdraw"
    }
}
