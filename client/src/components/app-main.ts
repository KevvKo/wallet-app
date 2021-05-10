import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Web3 from 'web3'

// declaration as any to work with window.ethereum in typescript
declare let window: any; 
declare let web3: Web3;
@customElement('app-main')
export class AppMain extends LitElement {
  
  @state()
  private walletAddress = '0x2e0299Fcf9cFDfb2Ff9dc90ED0853683f620d7fE';

  connectedCallback(){
    super.connectedCallback();   
    this._getBalance();
  }

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
    flex-wrap: wrap;
    width: 80%;
    align-items: center;
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
    margin: 5px;
    text-align: center;
    text-decoration: none;
    border-radius: 50%;
  }
  button:hover{
    cursor: pointer;
    filter: brightness(80%);
    transition: 0.2s;
  }
  @media only screen and (max-width: 950px){
    #transaction-buttons{
      margin: auto;
    }
  }`;

  render() {
    return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div id="app-main">
    ${this._checkForEthereum()
      ? html`
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
        </div>`
      : html`
        <div>
          No wallet-provider available. Please do ensure, that metamask is available!
        </div>`
      }     
      </div>`;
    }

    private _send(){

    }

    private _getBalance(){
    }

    private async _checkForEthereum(){
      if(window.ethereum){

        await window.ethereum.send('eth_requestAccounts');
        window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      }

      return false;
    }
  }
