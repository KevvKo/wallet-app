import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-header'
import './app-main'
import './app-footer'
@customElement('app-root')
export class AppRoot extends LitElement {

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300;1,400&display=swap');
    
    :host{
      --primary-color:    #2236e8;
      --secondary-color:  #7794e5;
      --accent-color:     #61a7d3;

      --success-color:    #24991e;
      --danger-color:     #ead117
      --warning-color:    #c91414;

      --white:            #f7f7ff;            
      --black:            #262121; 

      --grey-scale-1:     #e5e5e5;
      --grey-scale-2:     #b7b5b5;
      --grey-scale-3:     #545454;

      --font-weight-regular: 500;
      --font-color-default: var(--grey-scale-3);
      --font-color-light: var(--grey-scale-1);
      --spacer: 13px;

      --border-style: 1px solid var(--grey-scale-2);
    }
    #root{
      background: var(--white);
      font-family: 'Work Sans', sans-serif;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    body{
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
