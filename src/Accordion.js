import { LitElement, html } from '@polymer/lit-element';

export class Accordion extends LitElement {
  ENTER = 13;
  SPACEBAR = 32;

  constructor() {
    super();
    if (!this.attributes.open) {
      // if not specified as an attribute, then it's value should be false, not undefined.
      this.open = false;
    }

    this.openIcon = this.attributes.openIcon ? this.attributes.openIcon.value :  "+";
    this.closeIcon = this.attributes.closeIcon ? this.attributes.closeIcon.value : "×";
  }

  static get properties() {
    return {
      open: Boolean,
      title: String,
      openIcon: String,
      closeIcon: String,
    }
  }

  firstUpdated(){
    // get the content element.
    this.content = this.shadowRoot.querySelector('.content');
    this.wrapper = this.shadowRoot.querySelector('.wrapper');
    this.initialState = !!this.open;
  }

  _toggleAccordion(e) {
    // e.preventDefault();  
    if (
      e instanceof MouseEvent
      || (e instanceof KeyboardEvent
        && (e.keyCode === this.ENTER || e.keyCode === this.SPACEBAR))
    ) {
      e.preventDefault();
      // set open to its opposite boolean.
      this.open = !this.open;

      // handle the content.
      if (this.open) {
        this.setAttribute('open', true);
        this.content.style.maxHeight = this.content.scrollHeight + 'px';
        this.wrapper.classList.add('open');
      } else {
        this.removeAttribute('open');
        this.wrapper.classList.remove('open');
        this.content.style.maxHeight = 0;
      }
    } else {
      return true;
    }
  }

  _styles() {
    const { initialState, openIcon, closeIcon } = this;

    return html`
    <style>
     :host {
        display: block;
        width: 100%;
        background: var(--bg, whitesmoke);
        color: var(--color, inherit);
        font-family: inherit;
      }

      :host .title {
        display: block;
        width: 100%;
        text-align: inherit;
        background: inherit;
        font-size: inherit;
        color: inherit;
        outline: none;
        appearance: none;
        border: none;
        padding: var(--title-padding, .5rem 1rem);
        border-bottom: var(--title-border, solid 1px lightgrey);
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
      }

      :host .title:focus {
        box-shadow: 0 0 .5rem var(--focus-color, lightblue);
      }

      :host .title::after {
        display: inline-block;
        position: relative;
        content: "${openIcon}";
        right: 0;
      }

      :host .wrapper.open .title::after{
        content: "${closeIcon}"
      }

      :host .content {
        overflow: hidden;
        max-height: ${ initialState ? 'none' : 0
        };

        transition: max-height 250ms ease-out;
        background: var(--content-bg, #fafafa);
      }

      :host .internal-content {
        font-family: var(--content-font-famly, inherit);
        font-size: var(--content-font-size, inherit);
        padding: var(--content-padding,
        1rem);
      }
    </style>
    `
  }

  render() {
    const { title } = this;

    return html`
    ${ this._styles()}
    <div class="wrapper">
      <button
        class="title"
        @load="${this._load}"
        @click="${this._toggleAccordion}"
        @keydown=${this._toggleAccordion}
      >
        ${title}
      </button>

      <div class="content">
        <div class="internal-content">
          <slot></slot>
        </div>
      </div>
    </div>
    `;
  }

}


