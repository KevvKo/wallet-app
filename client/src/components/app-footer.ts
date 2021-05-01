import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {

    static styles = css`
      :host{
        height: max-content;
        margin-top: auto;
      }
      footer{
        font-weight: var(--font-weight-regular);
        padding: 10px;
        display: block;
        width: 100%;
        margin-top: auto;
      }
      a{
        color: var(--primary-color);
        text-decoration: none;
      }
    `;
    render() {
    return html`
    <footer>
      <a href="https://github.com/KevvKo/wallet-app">@M-Wallet</a>
    </footer>`;
  }
}
