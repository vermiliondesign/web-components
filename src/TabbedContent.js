import { LitElement, html } from '@polymer/lit-element';

/* This component is adapted from an example on developers.google.com that we found. */

export class TabbedContent extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      selected: Boolean
    }
  }

  firstUpdated() {
    this.setAttribute('role', 'tablist');
    const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
    const panelsSlot = this.shadowRoot.querySelector('#panelsSlot');

    this.tabs = tabsSlot.assignedNodes({ flatten: true });
    this.panels = panelsSlot.assignedNodes({ flatten: true }).filter(el => {
      return el.nodeType === Node.ELEMENT_NODE;
    });

    // Add aria role="tabpanel" to each content panel.
    for (const panel of this.panels) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', 0);
    }

    // Save refer to we can remove listeners later.
    this._boundOnTitleClick = this._onTitleClick.bind(this);
    this._boundOnKeyDown = this._onKeyDown.bind(this);
    tabsSlot.addEventListener('click', this._boundOnTitleClick);
    tabsSlot.addEventListener('keydown', this._boundOnKeyDown);

    this.selected = this._findFirstSelectedTab() || 0;
  }

  updated() {
    this._selectTab(this.selected);
  }

  _onTitleClick(e) {
    if (e.target.slot === 'title') {
      this.selected = this.tabs.indexOf(e.target);
      e.target.focus();
    }
  }

  _onKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'ArrowLeft':
        let idx;
        e.preventDefault();
        idx = this.selected - 1;
        idx = idx < 0 ? this.tabs.length - 1 : idx;
        this.tabs[idx].click();
        break;
      case 'ArrowDown':
      case 'ArrowRight':

        e.preventDefault();
        idx = this.selected + 1;
        this.tabs[idx % this.tabs.length].click();
        break;
      default:
        break;
    }
  }

  _findFirstSelectedTab() {
    let selectedIdx;
    for (const [i, tab] of this.tabs.entries()) {
      tab.setAttribute('role', 'tab');
      // Allow users to declaratively select a tab
      // Highlight last tab which has the selected attribute.
      if (tab.hasAttribute('selected')) {
        selectedIdx = i;
      }
    }
    return selectedIdx;
  }

  _selectTab(idx = null) {
    this.tabs.forEach((tab, i) => {
      const select = i === idx;
      tab.setAttribute('tabindex', select ? 0 : -1);
      tab.setAttribute('aria-selected', select);
      this.panels[i].setAttribute('aria-hidden', !select);
    });
  }

  _styles() {
    return html`
    <style>
        :host {
          display: block;
          width: 650px;
          contain: content;
        }
        :host([background]) {
          
        }
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabs slot {

          display: inline-flex; /* Safari bug. Treats <slot> as a parent */
        }
        /* Safari does not support #id prefixes on ::slotted
           See https://bugs.webkit.org/show_bug.cgi?id=160538 */
        #tabs ::slotted(*) {
          padding: 16px 8px;
          margin: 0;
          text-align: center;
          width: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          cursor: pointer;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          background: whitesmoke;
          outline: none;
          border: none; /* if the user users a <button> */
        }
        #tabs ::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #tabs ::slotted(:focus) {
          ouline:none;
          border: none;
          text-decoration: underline;

        }
        #panels ::slotted([aria-hidden="true"]) {
          display: none;
        }
    </style>
    `
  }

  render() {
    return html`
      ${this._styles()}
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>

      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
  }
}
