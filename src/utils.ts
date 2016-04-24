export class Utils {
    public static isPositiveInteger(obj: any): boolean {
        let nr = parseFloat(obj);

        if (!isNaN(nr)) {
            if (isFinite(nr)) {
                if (nr >= 0) {
                    return true;
                }
            }
        }

        return false;
    }
    public static arrayContains(array: any[], obj: any) {
        return array.indexOf(obj) > -1;
    }
}