import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// declaration as any to work with window.ethereum in typescript
declare let window: any; 
@customElement('app-main')
export class AppMain extends LitElement {
  
  @state()
  private _walletAddress = '0xDE703c365b6fec50B09a9f915F7CDf0Ac4A86869';
  @state()
  private _balance: any;
  @state()
  private _depositSectionIsVisible = false;
  @state()
  private _withdrawSectionIsVisible = false;

  connectedCallback(){
    super.connectedCallback();   
    this._getBalance().then( (value)=> {
      this._balance = value;
    })
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

  #transaction-buttons button:first-child a{
    text-decoration: none;
    color: inherit;
  }

  #balance{
    border: var(--border-style);
    border-radius: var(--border-radius);
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
          <account-info address="${this._walletAddress}"></account-info>
          <div id="transaction-buttons">
            <button title="withdraw" @click="${this._toggleWithdrawSectionVisibility}">
                <span class="material-icons">
                  vertical_align_top
                </span>
              </a>
            </button>
            <button title="deposit" @click="${this._toggleDepositSectionVisibility}">
              <span class="material-icons">
                vertical_align_bottom
              </span>    
            </button>
          </div>
        </div>
        ${this._getDepositSection()}
        ${this._getWithdrawSection()}
        <div id="balance">
          <token-balance
            tokenName="Ether"
            tokenId="ETH"
            tokenBalance="${this._balance}"
          ></token-balance>
        </div>`
      : html`
        <div>
          No wallet-provider available. Please do ensure, that metamask is available!
        </div>`
      }     
      </div>`;
    }

    private _toggleDepositSectionVisibility(){
      if(this._withdrawSectionIsVisible) this._withdrawSectionIsVisible = false
      this._depositSectionIsVisible = !this._depositSectionIsVisible;
    }
    private _toggleWithdrawSectionVisibility(){
      if(this._depositSectionIsVisible) this._depositSectionIsVisible = false
      this._withdrawSectionIsVisible = !this._withdrawSectionIsVisible;
    }
    private _getDepositSection(){
      let renderValue;

      this._depositSectionIsVisible 
        ? renderValue = html`<transaction-section transactionKind="deposit"></transaction-section>`
        : renderValue = html``
      return renderValue
    }

    private _getWithdrawSection(){
      let renderValue;

      this._withdrawSectionIsVisible 
        ? renderValue = html`<transaction-section transactionKind="withdraw"></transaction-section>`
        : renderValue = html``
      return renderValue
    }


    private async _getBalance(){

      const params = [
        this._walletAddress,
        'latest'
      ]

      if(window.ethereum){
        const response = await window.ethereum.request({ 
          method: 'eth_getBalance',
          params: params
        })
        const wei = await this._encodeQuantityToEther(response);
        return wei/1000000000000000000;  
      }    
    }

    private _checkForEthereum(){
      if(window.ethereum){
        window.ethereum.send('eth_requestAccounts');
        window.ethereum.request({ method: 'eth_requestAccounts' });
        return true;
      }

      return false;
    }

    private async _encodeQuantityToEther(quantity: string){
      if (quantity.length < 1) return 0
      return parseInt(quantity);
    }
  }
