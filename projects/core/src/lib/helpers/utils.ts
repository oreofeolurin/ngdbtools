

export class Utils {

    public static generateRandomID(length: number): string {

        const id = Math.random().toString(36).substr(2, length);

        if (id.length === length) {
            return id;
        }

        return Utils.generateRandomID(length);
    }
}
