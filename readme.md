# Vermilion Design + Digital Web Components
  This repository is a working library of web components built on the Polymer / LitElement platforms.

## Demo and list of components and usage:

[Demo and Component Documentation](https://vermiliondesign.github.io/web-components/)


## Usage

`npm i @vermilion/{package-name-not-published-yet}`

### In your Javascript:

  ```
  import { ComponentName } from '@vermilion/{package-name-not-published-yet}';

    ... 

  customElements.define('component-name', ComponentName);
    /** 
      * your component name must include a hyphen so the HTML parser in your browser knows this is a custom element.
    **/
  ```

### In your HTML:
  ```
  <component-name
    other="properties"
    passed="like this"
  >
    Slot Data passed here
  </component-name>
  ```



## Contributing | Development

1. Clone this repo
1. `$ cd vermilion-web-components`
1. `$ npm install`


### Build Tasks:
To run a development build and watch the Javascript files only:

  `$ npm start` 

To develop for the browser at localhost:1234 on the file at /demo/index.html

  `$ npm run dev`

To build only the Javascript files for production use:

  `$ npm run build`

To build the documentation and demo HTML files for production

  `$ npm run build-demo`

To build everything for production:

  `$ npm run package`


### Development

1. Take a look at `/template.js` for a boilerplate component class. This can serve as a scaffolding to how we are writing these components.
1. All new web components must be single, top-level files inside the `src` folder.
1. Prefix your example components with "vm-" in the examples.
1. When your component is ready for the browser, import it to `/src/index.js/` and add it to the exported object as a named export.
1. run one of the build taks above. Most likely `npm run dev`.


### Publishing

1. When you're ready to publish a component, first make sure that you've done everything you can to make it flexible and accessible (including tabindex and keyboard events);

1. Add an example to the `/demo/index.html` file with the following template:
  ```
    <section class="component" id="{{component-name}}">
      <h2>{{component-name}}</h2>

      <div class="container">

        <vm-{{component-name}}></vm-{{component-name}}>

        <h3>Usage:</h3>
          <pre>
            HTML:  
              <code class="language-html">
                <!--  your example markup here. -->
              </code>

            JavaScript:
              <code class="language-javascript">
                import { {{ComponentName}} } from './dist/index';
                  ...
                customElements.define('vm-{{component-name}}', {{ComponentName}});
              </code>
          </pre>
      </div>
    </section>
  ```

  1. `$ npm run build`
  1. Submit a Pull Request for all new Components.
