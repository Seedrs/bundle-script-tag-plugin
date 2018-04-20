<div align="center">
  <a href="https://webpack.js.org/">
    <img width="200" height="200" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1>bundle-script-tag-plugin</h1>
</div>


This plugin creates a small script that will generate a script tag
which then loads your main bundle. This allows your webpack generated
bundles to be included on other webpages. Useful for adding react
based components to legacy pages, or any other kind of script that you
want to embed or make available externally.

### Configuration

#### Minimal example

```js
module.exports = {
  plugins: [
    new BundleScriptTagPlugin({
      // The prefix name given to your generated script
      prefix: 'bundle',
      // Where the script should be output to
      output: './build',
      // The public path of the script defaults to the below value
      publicPath: '//',
      // This function should return the script code that you want
      // to output, shown is the default output
      content: assetPath => (
        `var n = document.createElement(\'script\');
         n.src = '${assetPath}';document.body.appendChild(n);
        `
      )
    })
  ]
};
```

Including the below snippet in your html page would then load the
generated script which in turn loads your webpack produced bundle.

```html
<script src="/bundle.js"></script>
```

This gives you a static link to your embeddable script while not
sacrificing long term caching on the larger application bundle.

