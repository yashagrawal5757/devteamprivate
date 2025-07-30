class DateUtils {
    static getMinutes = (time: number) => {
        const wholeNumber = Math.floor(time);
        const decimalPoint = time - wholeNumber;

        return decimalPoint * 60;
    };

    static getMonths = (year: number) => {
        const wholeNumber = Math.floor(year);
        const decimalPoint = year - wholeNumber;

        return decimalPoint * 12;
    };
}

export default DateUtils;
