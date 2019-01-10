import { LitElement, html } from '@polymer/lit-element';

export class CustomElement extends LitElement {

  constructor() {
    super();
    // only have access to this.shadowRoot at this time. 

    // this.requestUpdate(propertyName?, oldValue?) -> Promise. manually start an update.

    // this.shouldUpdate(changedProperties) -> Boolean. implement to override default behavior which specifies which property changes should cause updates.
  }

  static get properties() {
    return {
      open: Boolean,
      title: String,
      openIcon: String,
      closeIcon: String,
    }
    // note: all properties automatically get property.hasChanged which schedules updates.
  }

  firstUpdated() {
    // called after shadowDOM updated the first time. use for initialization
    console.log('firstUpdated');
  }

  updated() {
    // called on every update and render.
    console.log('updated');
  }

  static get _styles() {
    return html`
    <style>
    </style>
    `
  }

  render() {
    return html`
    
    `;
  }

}
