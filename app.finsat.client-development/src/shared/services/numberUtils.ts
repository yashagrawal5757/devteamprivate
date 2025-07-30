class NumberUtils {
    static formatNumber(number: number): string {
        if (number === undefined) {
            return 'N/A';
        }

        if (number >= 1e6) {
            return (number / 1e6).toFixed(0) + 'M';
        }

        if (number >= 1e3) {
            return (number / 1e3).toFixed(0) + 'K';
        }

        return number.toString();
    }

    static formatWithCommas(number: number | string): string {
        if (number === undefined) {
            return 'N/A';
        }

        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

export default NumberUtils;
