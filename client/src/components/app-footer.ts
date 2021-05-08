import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {

    static styles = css`
      :host{
        height: max-content;
        margin-top: auto;
        padding: 5px;
      }
      footer{
        font-weight: var(--font-weight-regular);
        margin-top: auto;
      }
      a{
        color: var(--font-color-default);
        text-decoration: none;
      }`;
    render() {
    return html`
    <footer>
      <a href="https://github.com/KevvKo/wallet-app">@M-Wallet</a>
    </footer>`;
  }
}
