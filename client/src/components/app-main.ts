import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
@customElement('app-main')
export class AppMain extends LitElement {

  static styles = css `
  :host{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #app-main, #balance{
    width: 80%;
  }
  #app-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #app-main > div:first-child{
    display: flex;
    width: 80%;
    align-items: center;
    margin-bottom: 15px;
  }
  #transaction-buttons{
    margin-left: auto;
  }
  #balance{
    border: var(--border-style);
    border-radius: 3px;
  }
  button{
    background: var(--primary-color);
    color: var(--font-color-light);
    border: none;
    padding: 12px;
    margin: 0 5px;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
  }
  button:hover{
    cursor: pointer;
    filter: brightness(80%);
    transition: 0.2s;
  }
  `;
  render() {
    return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div id="app-main">
      <div>
        <account-info></account-info>
        <div id="transaction-buttons">
          <button>
            <span class="material-icons">
              vertical_align_bottom
            </span>
          </button>
          <button>
            <span class="material-icons">
              call_made
            </span>    
          </button>
        </div>
      </div>
      <div id="balance">
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
      </div>
    </div>`;
  }
}
