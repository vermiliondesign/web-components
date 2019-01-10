// import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import { Accordion } from '../dist/index';
// import { Accordion } from './src/Accordion';

(() => {
  if (!customElements.get('vm-accordion')) {
    customElements.define('vm-accordion', Accordion);
  }
})();