export const getTime = function (time, format) {

  // 获取年份
  // var year = String(date.getFullYear());
  // console.log(year)
  time = new Date(time);
  // let format = 'MM月dd日';

  // console.log(time);

  let year = (time.getFullYear()).toString();  //2019
  if (/(y+)/.test(format)) {
    let yearContent = RegExp.$1;

    format = format.replace(yearContent, year.slice(-yearContent.length));
  }
  // 替换年份

  // 替换月日时分秒
  let obj = {
    M: time.getMonth() + 1,
    d: time.getDate(),
    h: time.getHours(),
    m: time.getMinutes(),
    s: time.getSeconds()
  };

  for (let key in obj) {
    let reg = new RegExp('(' + key + '+)');

    if (reg.test(format)) {
      let content = RegExp.$1;
      // console.log('content ==> ', content);

      format = format.replace(content, obj[key] >= 10 ? obj[key] : content.length <= 1 ? obj[key] : '0' + obj[key]);
    }
  }
  return format;

}

