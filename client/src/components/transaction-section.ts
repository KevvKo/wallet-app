import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import transactionMembers from './interfaces//transaction-members'
import BigNumber from 'bignumber.js'

declare let window: any; 

@customElement('transaction-section')
export class TransactionSection extends LitElement {
    
    @property()
    transactionKind: string;

    @state()
    private _recipientAddress = '0x2e0299Fcf9cFDfb2Ff9dc90ED0853683f620d7fE'
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

        if(!this._recipientAddress) {
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
            sender: '0x2e0299Fcf9cFDfb2Ff9dc90ED0853683f620d7fE'
        }
        :   
        transactionMembers = {
            recipient: '0x2e0299Fcf9cFDfb2Ff9dc90ED0853683f620d7fE',
            sender: window.ethereum.selectedAddress
        }
        
        console.log(transactionMembers)
        const params = [{
            "from": transactionMembers.sender,
            "to": transactionMembers.recipient,
            "gas": gasLimit, 
            "gasPrice": gasPrice, 
            "value": value 
        }]      

        window.ethereum.request({
            method: 'eth_sendTransaction',
            params
        })
    }

    private _initializeTransactionKind(){
        this.transactionKind === "withdraw"
        ? this.title = "Deposit"
        : this.title = "Withdraw"
    }
}
