class NameInitialUtils {
    static getInitials(name: string): string {
        const nameArray = name.trim().split(' ');

        if (nameArray.length === 1) {
            return nameArray[0].charAt(0).toUpperCase();
        }

        const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
        const lastNameInitial = nameArray[nameArray.length - 1]
            .charAt(0)
            .toUpperCase();

        return firstNameInitial + lastNameInitial;
    }
}

export default NameInitialUtils;
