import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('account-balance')
export class AccountBalance extends LitElement {
    static styles = css`

    :host{
        width: 80%;
    }
    #account-balance{
        background: var(--white);
        border-radius: 3px;
        color: var(--font-color);
        padding: var(--spacer);
    }
    `;
    render() {
        return html`
        <div id="account-balance">
            <h3>Balance</h3>
        </div>`;
    }
}
