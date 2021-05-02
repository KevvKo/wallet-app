import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('token-balance')
export class TokenBalance extends LitElement {
    @property()
    tokenName: string;
    @property()
    tokenId: string;
    @property()
    tokenBalance: number;

  render() {
    return html`
    <div id="token-balance">
        <p>
            <span>${this.tokenName}</span>
            <span>${this.tokenId}</span>
            <span>${this.tokenBalance}</span>
        </p>
    </div>`;
  }
}
