import fs from 'fs';
import path from 'path';

class WebpackBundlePlugin {
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

    compiler.plugin('after-emit',(compilation) => {
      const { assets } = compilation.getStats().toJson();

      assets.forEach((asset) => {
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
    });
  }
}

export default WebpackBundlePlugin;
