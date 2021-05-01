import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app-header'
import './app-main'
import './app-footer'
@customElement('app-root')
export class AppRoot extends LitElement {

  static styles = css`
    :host{
      --primary-color:    #305ddb;
      --secondary-color:  #7794e5;
      --accent-color:     #61a7d3;

      --success-color:    #24991e;
      --danger-color:     #ead117
      --warning-color:    #c91414;

      --white:            #efefef;            
      --black:            #262121; 

      --grey-scale-1:     #cecece;
      --grey-scale-2:     #b7b5b5;
      --grey-scale-3:     #999999;
    }

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
