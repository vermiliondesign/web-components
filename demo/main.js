// import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import { execPolyfill, Accordion, TabbedContent } from '../dist/index';

(() => {
  if (!!!window.customElements) {
    execPolyfill();
  }
  if (!customElements.get('vm-accordion')) {
    customElements.define('vm-accordion', Accordion);
  }

  if (!customElements.get('vm-tabs')) {
    customElements.define('vm-tabs', TabbedContent);
  }
})();