import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('send-section')
export class SendSection extends LitElement {

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
    `;
    render() {
    return html`
    <form>
        <div>
            <label>Recipient:</label>
            <input 
                type="text" 
                placeholder="address..."
            >
            <label>Ether:</label>
            <input 
                type="text" 
                placeholder="amount..."
            >
        </div>
        <div>
            <label>Transaction Fee:</label>
            <input type="number" placeholder="gas price" value="3">
            <input type="number" placeholder="gas limit" value="21000">
            <button type="submit">send</button>
        </div>
    </form>`;
  }
}
