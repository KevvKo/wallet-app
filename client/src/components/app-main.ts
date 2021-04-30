import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-main')
export class AppMain extends LitElement {

  render() {
    return html`<div id="app-main"></div>`;
  }
}
