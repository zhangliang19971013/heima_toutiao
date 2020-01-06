// 封装一个全局过滤器
export const filters = (time, spe, spo) => {
  spe = spe || '-';
  spo = spo || ':';
  time = new Date(time);
  let year = time.getFullYear();
  let mon = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  return `${year}${spe}${mon}${spe}${day}  ${hour}${spo}${min}${spo}${sec}`
}
