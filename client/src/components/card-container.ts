import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('card-container')
export class CardContainer extends LitElement {

  render() {
    return html`<div id="card-container"></div>`;
  }
}
