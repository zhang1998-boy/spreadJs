class DateUtils {
  constructor() {
    this.date = new Date();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth();
    this.day = new Date().getDate();
  }

  /**
   * @description: 得到今天、昨天、明天日期
   * @param {number} dates 为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
   * @return {*}
   */
  getDay(dates) {
    const n = dates || 0;
    this.date.setDate(this.day + n);
    const m = this.month < 10 ? `0${this.month + 1}` : this.month;
    const d = this.day < 10 ? `0${this.day}` : this.day;
    return `${this.year}-${m}-${d}`;
  }

  /**
   * @description: 得到本周、上周、下周的起始、结束日期
   * @param {string} type为字符串类型，有两种选择，"s"代表开始,"e"代表结束
   * @param {number} dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
   * @return {*}
   */
  getMonday(type, dates) {
    const nowTime = this.date.getTime();
    const longTime = 24 * 60 * 60 * 1000;
    const weekTime = longTime * 7 * (dates || 0);

    let cWeekTime = 0;
    if (type === 's') {
      cWeekTime = nowTime - (this.day - 1) * longTime + weekTime;
    } else if (type === 'e') {
      cWeekTime = nowTime + (7 - this.day) * longTime + weekTime;
    }

    const newDate = new Date(cWeekTime);

    let m = newDate.getMonth() + 1;
    let d = newDate.getDate();
    m = m < 10 ? `0${m}` : m;
    d = d < 10 ? `0${d}` : d;
    return `${this.year}-${m}-${d}`;
  }

  /**
   * @description: 得到本月、上月、下月的起始、结束日期
   * @param {string} type为字符串类型，有两种选择，"s"代表开始,"e"代表结束
   * @param {number} months为数字类型，不传或0代表本月，-1代表上月，1代表下月
   * @return {*}
   */
  getMonth(type, months) {
    const has31Days = ['01', '03', '05', '07', '08', '10', '12'];
    let year = this.date.getFullYear();
    let month = this.date.getMonth() + 1;
    if (Math.abs(months) > 12) {
      months %= 12;
    }
    if (months !== 0) {
      if (month + months > 12) {
        year++;
        month = (month + months) % 12;
      } else if (month + months < 1) {
        year--;
        month = 12 + month + months;
      } else {
        month += months;
      }
    }
    month = month < 10 ? `0${month}` : month;

    const firstDay = `${year}-${month}-01`;
    let lastDay = '';
    if (has31Days.includes(month)) {
      lastDay = `${year}-${month}-${31}`;
    } else if (month === '02') {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
        lastDay = `${year}-${month}-${29}`;
      } else {
        lastDay = `${year}-${month}-${28}`;
      }
    } else {
      lastDay = `${year}-${month}-${30}`;
    }
    let day = '';
    if (type === 's') {
      day = firstDay;
    } else {
      day = lastDay;
    }
    return day;
  }

  /**
   * @description: 得到今年、去年、明年的开始、结束日期
   * @param {string} type为字符串类型，有两种选择，"s"代表开始,"e"代表结束
   * @param {number} dates为数字类型，不传或0代表今年，-1代表去年，1代表明年
   * @return {*}
   */
  getYear(type, dates) {
    const n = dates || 0;
    const year = this.date.getFullYear() + Number(n);
    return type === 's' ? `${year}-01-01` : `${year}-12-31`;
  }

  /**
   * @description: 格式化时间
   * @param {any} time 时间戳
   * @param {string} cFormat 格式
   * @return {*} 格式化后的标准时时间
   */
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return '';
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date = this.date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time *= 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = `0${value}`;
      }
      return value || 0;
    });
    return timeStr;
  }
}

export default new DateUtils();
