import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

declare let window: any; 
@customElement('deposit-section')
export class DepositSection extends LitElement {
    
    @state()
    recipientAddress = ''
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
    }
    div{
        margin: var(--spacer) 0;
    }
    label{
        font-weight: bold; 
    }
    input{
        margin-right: 15px;
    }
    button{
        float: right;
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
        <div>
            <label>Recipient:</label>
            <input 
                type="text" 
                placeholder="address..."
                value="${this.recipientAddress}"
                @change="${(e) => {this.recipientAddress = e.target.value}}"
            >
            <label>Ether:</label>
            <input 
                type="text" 
                placeholder="amount..."
                value="${this.ether}"
                @change="${(e) => {this.ether = e.target.value}}"
            >
        </div>
        <div>
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
        </div>
        ${ this.invalid 
            ?  html`<div class="error-validation">Please enter a valid address</div>`
            : html``
        }`;
    }

    private async _deposit(){

        if(!this.recipientAddress) {
            this.invalid = true
            return
        }

        const params = [{
            "from": window.ethereum.selectedAddress,
            "to": this.recipientAddress,
            "gas": "0x" + this.gasLimit.toString(16), 
            "gasPrice": "0x" + this.gasPrice.toString(16),
            "value": "0x" + this.ether.toString(16),
        }]      

        window.ethereum.request({
            method: 'eth_sendTransaction',
            params
        })
    }
}
