import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('account-balance')
export class AccountBalance extends LitElement {
    static styles = css`

    `;
    render() {
        return html`
        <div id="account-balance">
            <h2>Balance</h2>
        </div>`;
    }
}
