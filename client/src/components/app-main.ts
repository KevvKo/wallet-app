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
    height: 100%;
  }
  `;
  render() {
    return html`
    <div id="app-main">
        <account-balance></account-balance>
        <card-container>
          <token-balance
            tokenName="Bitcoin"
            tokenId="BTC"
            tokenBalance="34"
          ></token-balance>
        </card-container>   
        <card-container>
          <token-balance
          tokenName="Ethereum"
          tokenId="ETH"
          tokenBalance="423"
          ></token-balance>
        </card-container>   
    </div>`;
  }
}
