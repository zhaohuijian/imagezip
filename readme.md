# imagezip

前端性能图像（jpg、png、gif）压缩工具。对整个项目或目录、或单个图片、多个图片深度无损压缩，使用业界前沿的程序算法，压缩率达50%以上，并且几乎看不出质量差别，极致的图片性能优化，帮助我们开发拥有极致用户体验的产品。

**为什么要做图片压缩**
> Google官方的最佳实践中关于图片优化有下面这样一段描述：对于网页来说，在所下载的字节数中，图片往往会占很大比例。因此，优化图片通常可以卓有成效地减少字节数和改进性能：浏览器需要下载的字节数越少，对客户端带宽的争用就越少，浏览器下载内容并在屏幕上呈现内容的速度就越快。

## 全局安装

```
# 使用npm安装
npm install imagezip -g 

# 使用yarn安装
yarn global add imagezip
```

## 全局使用

```bash
➜  imagezip --help
Usage: index [options]

Options:
  -V, --version         output the version number
  -Q --quality [0~100]  jpg/jpeg压缩质量 (default: "80")
  -I --input [folder]   原始图像目录 (default: "./")
  -O --output [folder]  压缩图像存放目录 (default: null)
  -S --subdir [bool]    压缩包含子目录的图像 (default: false)
  -h, --help            output usage information
```

### 基本功能

```bash
# 压缩当前目录所有图片
imagezip

# 压缩当前目录及子目录下的所有图片
imagezip --subdir

# 压缩当前目录单个图片
imagezip demo.jpg

# 设置jpg/jpeg的压缩质量为 70 （范围0~100）
imagezip demo.jpg --quality 70

# 压缩指定目录中的图片
imagezip /Users/furic/www/assets/demo.jpg

# 压缩多个图片以空格分开
imagezip demo1.jpg demo2.png demo3.gif

# 压缩 /Users/furic/www/assets 目录下的所有图片
imagezip --input /Users/furic/www/assets

# 压缩当前目录所有图片并将压缩后的图片保存到 /Users/furic/minify 目录
imagezip --output /Users/furic/minify
```
> 若不设置`--output`参数，压缩后的图像将覆盖原图像。

### 使用示例

```bash
➜  cd assets
assets
├── hsy.child.jpg
├── hsy.loading.gif
└── hsy.png

➜  imagezip
✔ hsy.child.jpg (saved 611 kB to 330 kB - 281 kB/46%)
✔ hsy.loading.gif (saved 445 kB to 423 kB - 21.9 kB/4.9%)
✔ hsy.png (saved 1.4 MB to 629 kB - 768 kB/55%)
Minified 3 images (saved 2.45 MB to 1.38 MB - 1.07 MB/43.7%)
```
输出结果说明：
> (saved 原图大小(kB) to 压缩后图片大小(kB) - 压缩大小(kB) / 压缩率%)

## 项目中本地安装

```bash
# 使用npm安装
npm install imagezip --save-dev

#使用yarn安装
yarn add imagezip -D
```
## 项目中本地使用

在项目的`package.json`文件中配置`scripts`。

```json
{
  "name": "project-demo",
  "version": "1.0.0",
  "main": "",
  "scripts": {
    "imagezip": "imagezip --subdir --input src/static/images"
  },
  "devDependencies": {
    "imagezip": "^1.1.0"
  }
}

```
执行:
```bash
yarn imagezip #或者 npm run imagezip
```
压缩本项目`src/static/images`目录中的所有图片。

```bash
#可以使用绝对路径
imagezip --subdir --input /Users/furic/project-web/src/static/images

#命令行参数也可以使用简写
imagezip -S -I src/static/images
```

## Tips

如果你的手机、电脑中有大量的数码照片，此工具可为你节省大量的存储空间。

> 电脑中存储的某些照片是`已锁定`状态，请确保你要压缩的照片的读、写权限。

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).