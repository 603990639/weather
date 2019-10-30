window.onload = function () {
  //手机端最大安全尺寸 640px
  //以iphone6屏为标准 375px 设置100px
  let stadWidth = 375;

  //获取屏幕的宽度
  let screenWidth = window.screen.width;

  let size = screenWidth / stadWidth * 100;

  let id = 'rem' + new Date().getTime();
  let head = this.document.getElementsByTagName('head')[0];
  let style = document.createElement('style');
  style.setAttribute('id', id);
  let innerhtml = `html{font-size:${size}px;}`;
  style.innerHTML = innerhtml;
  head.appendChild(style);

  // head.innerHTML = '<style id="' + id + '">html{font-size: ' + size + 'px;}</style>'
  // var html = 
  // var style = $();

  // $('head').append(style);

}