import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('account-balance')
export class AccountBalance extends LitElement {
    static styles = css`

    :host{
        width: 80%;
    }
    #account-balance{
        display: flex;
        color: var(--font-color);
        padding: var(--spacer);
    }
    h3{
        margin: 0;
        line-height: 17px;
        color: var(--primary-color);
    }
    h3 + div{
        margin-left: 15px;
    }
    `;
    render() {
        return html`
        <div id="account-balance">
            <h3>Account:</h3>
            <div>0x3868E57fbd4a5EF4459Bd2045028748F88641474</div>
        </div>`;
    }
}
