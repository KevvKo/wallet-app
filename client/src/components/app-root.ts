import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-header'
import './app-main'
import './app-footer'
@customElement('app-root')
export class AppRoot extends LitElement {

  static styles = css`
    body{
      height: 100%;
    }
    #root{
      width: 100%;
      height: 100%;
    }
  `
  render() {
    return html`
      <div id="root">
        <app-header></app-header>
        <app-main></app-main>
        <app-footer></app-footer>
      </div>`;
  }
}
