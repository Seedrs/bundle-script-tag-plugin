import fs from 'fs';
import path from 'path';

class BundleScriptTagPlugin {
  constructor (options) {
    this.opts = Object.assign({
      prefix: 'bundle',
      output: './build',
      publicPath: '//',
      content: assetPath => (
        [
          'var n = document.createElement(\'script\');',
          `n.src = '${assetPath}';`,
          'document.body.appendChild(n);'
        ].join('')
      )
    }, options || {});
    this.apply = this.apply.bind(this);
  }

  apply (compiler) {
    const {
      output,
      prefix,
      publicPath,
      content
    } = this.opts;

    const appDir = fs.realpathSync(process.cwd());
    const outputDir = path.resolve(appDir, output);

    const bundleScript = (stats) => {
      const { assets } = stats.toJson();

      const jsFiles = assets.filter(({ name }) => name.match(/\.js?$/));

      jsFiles.forEach((asset) => {
        const {
          name,
          chunkNames
        } = asset;

        const partial = chunkNames.join('');
        const filename = `${prefix}-${partial}.js`;
        const outputFile = path.resolve(outputDir, filename);
        const assetPath = `${publicPath}/${name}`;
        const fileContents = content(assetPath);

        fs.writeFile(outputFile,fileContents, (err) => {
          if (err) {
            process.stdout.write(err);
          }
        });
      });
    };

    // Run
    if (compiler.hooks) {
      compiler.hooks.done.tap('BundleScriptTagPlugin', bundleScript);
    } else {
      compiler.plugin('done', bundleScript);
    }
  }
}

export default BundleScriptTagPlugin;
