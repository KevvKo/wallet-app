import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('token-balance')
export class TokenBalance extends LitElement {

    tokenName?: string;
    tokenShortHand?: string;
    tokenCount?: number;

    @property()

    static styles = css`
    `;
    render() {
        return html`<div id="token-balance"></div>`;
    }
}
