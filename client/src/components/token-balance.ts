import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('token-balance')
export class TokenBalance extends LitElement {
  static styles = css`
    :host{
      width: 80%;
    }
    #token-balance{
      display:flex;
      padding: var(--spacer);
      color: var(--font-color);
      font-weight: var(--font-weight-regular);
    }
    div:not(#token-balance){
      flex-grow: 1;
      text-align: center;
    }`;

    @property()
    tokenName: string;
    @property()
    tokenId: string;
    @property()
    tokenBalance: number;

  render() {
    return html`
    <div id="token-balance">
        <div>${this.tokenId}</div>
        <div>${this.tokenBalance}</div>
    </div>`;
  }
}
