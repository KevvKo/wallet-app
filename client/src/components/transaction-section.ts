// @ts-nocheck

import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
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
    ether = new BigNumber(0);
    @state()
    gasPrice = new BigNumber(3);
    @state()
    gasLimit = new BigNumber(21000);
    @state()
    invalid = false;
    @state()
    title: string;
    @state()
    private _confirmed = false;
    @state()
    transactionHash: string;


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
    .transaction-confirmation{
        text-align: center;
        color: var(--success-color);
    }
    a{
        color: var(--success-color);
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
        }
        ${ this._confirmed
            ? html`
                <div class="transaction-confirmation">Transaction confirmed:
                    <a href="https://kovan.etherscan.io/tx/${this.transactionHash}">${this.transactionHash}</a> 
                </div>`
            : html`` 
        }
        `;
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

        if( this.ether * 1000000000000000000){
            console.info("To small units. Please enter a valid ether amount!")
            return
        }

        const value    = this.getQuantity(this.integerToWei(this.ether));
        const gasLimit = this.getQuantity(this.gasLimit);
        const gasPrice = this.getQuantity(this.integerToGWei(this.gasPrice));

        this.transactionKind === 'withdraw'
        ? this._withdraw(value, gasLimit)
        : this._deposit(value, gasPrice, gasLimit);
    }

    private async _deposit(value: number, gas: number, gasLimit: number){

        const params = [{
            "from": window.ethereum.selectedAddress,
            "to": this._mwalletAddress,
            "gas": gasLimit, 
            "gasPrice": gas, 
            "value": value 
        }]      

        window.ethereum.request({
            method: 'eth_sendTransaction',
            params
        })
    }

    private async _withdraw(value: number, gasLimit: number){
        const address = window.ethereum.selectedAddress
        const abi = contract.abi
        const mwallet = new web3.eth.Contract(abi, this._mwalletAddress);
        const estimatedGas = await mwallet.methods.send(address, value).estimateGas({from: address})
        if(estimatedGas > gasLimit) {
            console.log("Required gas exceeds gas limit!");
            console.log("At least gas is necessary:" + estimatedGas)
            return
        }

        mwallet.methods.send( address, value).send({from: address, gas: estimatedGas})
        .on('receipt', receipt => {
            this._confirmed = true;
            this.transactionHash = receipt.transactionHash;    
            setTimeout(() => {
                this._confirmed = false;
            }, '7000')
        })
        .on('error', error => console.log('Transaction failed: ' + error))
    }

    private _initializeTransactionKind(){
        this.transactionKind === "withdraw"
        ? this.title = "Withdraw"
        : this.title = "Deposit"
    }
}
