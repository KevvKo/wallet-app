import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('account-info')
export class AccountInfo extends LitElement {

    @property()
    address: string;

    static styles = css`

    :host{
        width: 80%;
        display: block;
    }
    #account-info{
        display: flex;
        color: var(--font-color);
        padding: var(--spacer) 0;
    }
    h3{
        margin: 0;
        line-height: 17px;
        color: var(--primary-color);
    }
    h3 + div{
        margin-left: 15px;
        overflow: auto;
    }
    `;
    render() {
        return html`
        <div id="account-info">
            <h3>Account:</h3>
            <div>${this.address}</div>
        </div>`;
    }
}
