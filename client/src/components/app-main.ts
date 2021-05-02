import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('app-main')
export class AppMain extends LitElement {

  static styles = css `
  :host{
    flex: 1;
  }
  #app-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  `;
  render() {
    return html`
    <div id="app-main">
        <account-balance></account-balance>
        <token-balance
          tokenName="Bitcoin"
          tokenId="BTC"
          tokenBalance="34"
          tokenVolume="10"
        ></token-balance>
        <token-balance
        tokenName="Ethereum"
        tokenId="ETH"
        tokenBalance="423"
        tokenVolume="43"
        ></token-balance>
    </div>`;
  }
}
