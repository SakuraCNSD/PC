const { series, src, dest, watch } = require('gulp');
const minimist = require('minimist'); //获取命令新中的参数
const spritesmith = require('gulp.spritesmith'); //合成雪碧图
const fs = require('fs');
const path = require('path');
const imgUrl = {
  //设置图片的输入和输出路径
  main: './src/assets',
  retina: '/retinaImage/',
  image: '/Image/',
  sprite: './src/Sprite',
};
const knownOptions = {
  //定义命令行参数
  string: ['isRetina'],
  default: {
    isRetina: false,
  },
};
const cmdOptions = minimist(process.argv, knownOptions); //记录命令行参数
const spriteOptions = {}; //合成雪碧图的配置对象
let ext, //记录后缀名
  isRetina, //记录是否是生成retina屏幕的图片
  imgList, //记录目录下的文件
  isOnce = true; //记录是不是第一次执行

//生成雪碧图函数(注意：生成retina屏幕图片需要原始图片和2倍原始图片数量一样多，不然编译会报错)
async function Sprite() {
  if (isOnce) {
    isRetina = Boolean(cmdOptions.isRetina);
    imgUrl.main += isRetina ? imgUrl.retina : imgUrl.image;
    imgList = await fs.promises.readdir(imgUrl.main);
    ext = path.extname(imgList[0]);
    spriteOptions.imgName = `sprite${ext}`;
    spriteOptions.cssName = 'sprite.css';
    spriteOptions.algorithm = 'binary-tree';
    spriteOptions.cssOpts = {
      cssSelector: function(sprite) {
        return '.icon-' + sprite.name;
      },
    };
    if (isRetina) {
      spriteOptions.retinaSrcFilter = `${imgUrl.main}*@2x${ext}`;
      spriteOptions.retinaImgName = `sprite@2x${ext}`;
    }
    isOnce = false;
  }
  return src(`${imgUrl.main}*${ext}`)
    .pipe(spritesmith(spriteOptions))
    .pipe(dest(imgUrl.sprite));
}
//监听文件夹中的变化
watch(imgUrl.main, cb => {
  Sprite();
  cb();
});
exports.default = series(Sprite);
