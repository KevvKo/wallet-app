import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AccountBalance } from './account-balance';
import { CardContainer } from './card-container';
import { TokenBalance } from './tokenBalance';
@customElement('app-main')
export class AppMain extends LitElement {

  render() {
    return html`
    <div id="app-main">
        <account-balance></account-balance>
        <card-container>
            <token-balance></token-balance>
        </card-container>   
        <card-container>
            <token-balance></token-balance>
        </card-container>   
    </div>`;
  }
}
