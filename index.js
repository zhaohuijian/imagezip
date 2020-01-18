/**
 * Copyright (c) 2020-present, chanjet, Inc.
 */

const program = require('commander');
const path = require('path');
const prettyBytes = require('pretty-bytes');
const chalk = require('chalk');
const plur = require('plur');
const ora = require('ora');
const boxen = require('boxen');
const imagemin = require('fez-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminGifsicle = require('imagemin-gifsicle');

program
  .version('1.1.1')
  .option('-Q --quality [0~100]', 'JPG压缩质量', '80')
  .option('-I --input [folder]', '原始图像目录', './')
  .option('-O --output [folder]', '压缩图像存放目录', null)
  .option('-S --subdir [bool]', '压缩包含子目录的图像', false)
  .parse(process.argv);

module.exports = async function () {
  let params = [];
  if (program.args.length > 0) {
    params = params.concat([...program.args]);
  } else {
    params = params.concat([path.resolve(process.cwd(), program.input, `${program.subdir ? '**/' : ''}*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF}`)]);
  }
  let message = chalk.cyan('欢迎使用ImageZip图像深度压缩工具');
  message += `\n\n${chalk.gray('More info see:https://github.com/chanjet-fe/imagezip')}`;
  console.log(boxen(message, {
    padding: 1,
    borderColor: 'white',
    margin: 0,
    borderStyle: 'classic'
  }));
  const spinner = ora('Minifying images...').start();
  const files = await imagemin(params, {
    destination: program.output ? path.resolve(process.cwd(), program.output) : null,
    plugins: [
      imageminJpegtran(),
      imageminMozjpeg({
        quality: program.quality
      }),
      imageminPngquant({
        quality: [0.6, 1]
      }),
      imageminGifsicle({
        optimizationLevel: 3
      })
    ]
  });
  spinner.stop();

  let totalBytes = 0;
  let totalOptimizedBytes = 0;
  let totalSavedBytes = 0;
  let totalFiles = 0;

  files.map(file => {
    const originalSize = file.originData.length;
    const optimizedSize = file.data.length;
    const saved = originalSize - optimizedSize;
    const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;
    const savedMsg = `saved ${prettyBytes(originalSize)} to ${prettyBytes(optimizedSize)} - ${prettyBytes(saved)}/${percent.toFixed(1).replace(/\.0$/, '')}%`;
    const msg = saved > 0 ? savedMsg : 'already optimized';

    if (saved > 0) {
      totalBytes += originalSize;
      totalOptimizedBytes += optimizedSize;
      totalSavedBytes += saved;
      totalFiles++;
    }
    console.log(chalk.green('✔ ' + path.basename(file.destinationPath)) + chalk.gray(` (${msg})`));
  })


  const totalPercent = totalBytes > 0 ? (totalSavedBytes / totalBytes) * 100 : 0;
  let totalMsg = chalk.blue(`Minified ${totalFiles} ${plur('image', totalFiles)}`);

  if (totalFiles > 0) {
    totalMsg += chalk.gray(` (saved ${prettyBytes(totalBytes)} to ${prettyBytes(totalOptimizedBytes)} - ${prettyBytes(totalSavedBytes)}/${totalPercent.toFixed(1).replace(/\.0$/, '')}%)`);
  }

  console.log(totalMsg);
}();
