export class DbHelpers {
    public static IdsToString(ids: number[]): string {
        //Note all code using IdsToString is vulnerable for sql injection
        return ids.reduce((pre, cur) => `${pre},(${cur})`, '').substr(1);
    }
}