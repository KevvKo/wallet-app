import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-root')
export class AppRoot extends LitElement {
    // static styles = css`
    // :host{
    //     --primary-color: #2358ea;
    //     --secondary-color: #e8edff;
    // }
    // `;

    render(){
        return html` <div id="root">
            hello
        </div>`;
    }
}