import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import BigNumber from 'bignumber.js';

declare let window: any; 
@customElement('deposit-section')
export class DepositSection extends LitElement {
    
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

    static styles = css`
    :host{
        width: 80%;
        padding: var(--spacer) 0;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    div{
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
    render() {
        return html`
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
        <button @click="${this._deposit}">send</button>
        ${ this.invalid 
            ?  html`<div class="error-validation">Please enter a valid address</div>`
            : html``
        }`;
    }

    integerToWei(ether: number){
        return ether * 10**18;
    }

    integerToGWei(ether: number){
        return ether * 10**9;
    }

    toHex(integer: number){
        return integer.toString(16);
    }

    getQuantity(value: number){
        return '0x' + this.toHex(value);
    }

    private async _deposit(){

        if(!this._recipientAddress) {
            this.invalid = true
            return
        }

        const value    = this.getQuantity(this.integerToWei(this.ether));
        const gasPrice = this.getQuantity(this.integerToGWei(this.gasPrice));
        const gasLimit = this.getQuantity(this.gasLimit)

        const params = [{
            "from": window.ethereum.selectedAddress,
            "to": this._recipientAddress,
            "gas": gasLimit, 
            "gasPrice": gasPrice, 
            "value": value 
        }]      

        window.ethereum.request({
            method: 'eth_sendTransaction',
            params
        })
    }
}