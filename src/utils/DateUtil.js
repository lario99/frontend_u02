
export default class DateUtil {

    static twoDigitsFormat(n) {
        return n > 9 ? '' + n : '0' + n;
    }


    static secondsToTime(seconds) {
        let date = new Date(seconds * 1000);
        return `${DateUtil.twoDigitsFormat(date.getHours())}:${DateUtil.twoDigitsFormat(date.getMinutes())}:${DateUtil.twoDigitsFormat(date.getSeconds())}`
    }

    static secondsToHour(seconds){
        let date = new Date(seconds * 1000);
        return date.getHours();
    }
}