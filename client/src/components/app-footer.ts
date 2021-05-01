import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {

    static styles = css`
      footer{
        height: 40px;
        width: 100%;
        margin-top: auto;
      }
      a{
        color: var(--accent-color);
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
