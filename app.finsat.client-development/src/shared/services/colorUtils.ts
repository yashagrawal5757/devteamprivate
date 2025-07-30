class ColorUtils {
    static hexToRgb(hex: string): { red: number; green: number; blue: number } {
        hex = hex.replace(/^#/, '');

        let bigint = parseInt(hex, 16);
        let red = (bigint >> 16) & 255;
        let green = (bigint >> 8) & 255;
        let blue = bigint & 255;

        return { red, green, blue };
    }
}

export default ColorUtils;
